import { defineAction, z } from "astro:actions";
import { getUserByEmail } from "@/db/user.db";
import { deleteVerificationTokenById, getVerificationTokenByToken } from "@/db/verification-token";
import { generatePasswordVerificationToken } from "@/lib/tokens";
import { sendPasswordResetTokenEmail } from "@/lib/mail";



// This action verifies the email address associated with a verification token.
// It checks if the token exists in the database, if the user exists, if the token has not expired, and if the email address is verified.
// If all checks pass, it updates the user's email verification status and email address.
// If any check fails, it returns an error message.
export const verifyEmail = defineAction({
    accept: 'json',
    input: z.object({
        token: z.string(),
    }),
    handler: async (input) => {
        const { token } = input;

        // Check if the token exists in the database.
        const existingToken = await getVerificationTokenByToken(token);

        // If the token does not exist, return an error message.
        if (!existingToken) {
            return {
                status: "error",
                message: "Token does not exist"
            };
        }

        // Check if the token has expired.
        const hasExpired = new Date(existingToken.expires) < new Date();

        // If the token has expired, return an error message.
        if (hasExpired) {
            return {
                status: "error",
                message: "Token has expired!"
            };
        }

        // Check if the user associated with the token exists.
        const existingUser = await getUserByEmail(existingToken.email);

        // If the user does not exist, return an error message.
        if (!existingUser) {
            return {
                status: "error",
                message: "Email does not exist"
            };
        }

        //  TODO: Update the user's email verification status and email address.


        // Delete the verification token from the database.
        await deleteVerificationTokenById(existingToken.id);

        // Return a success message indicating that the email has been verified.
        return {
            status: "success",
            message: "Email verified!"
        };
    }
});


// This action resets the password verification token for a user.
// It checks if the email exists in the database, if the user exists, and if the token has not expired.
// If all checks pass, it generates a new password reset token for the user's email and sends it to the user.
// If any check fails, it returns an error message.
export const resetVerificationToken = defineAction({
    accept: 'json',
    input: z.object({
        email: z.string().email({ message: "Must be a valid email" }),
    }),
    handler: async (input) => {
        const { email } = input;

        // Check if the email exists in the database.
        const existingUser = await getUserByEmail(email);

        // If the user does not exist, return an error message.
        if (!existingUser) {
            return {
                status: "error",
                message: "Email not found"
            };
        }

        // Generate a password reset token for the user's email.
        const passwordResetToken = await generatePasswordVerificationToken(email);

        // Send the password reset token to the user's email.
        await sendPasswordResetTokenEmail({
            email: passwordResetToken?.email || '',
            token: passwordResetToken?.token || ''
        });

        // Return a success message indicating that the confirmation email has been sent.
        return {
            status: "success",
            message: "Confirmation email sent!"
        };
    }
});



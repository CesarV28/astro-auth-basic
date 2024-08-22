import { createTwoFactorConfirmation, deleteTwoFactorConfirmationById, getTwoFactorConfirmationByUserId } from "@/db/two-factor-confirmation.db";
import { deleteTwoFactorTokenTokenById, getTwoFactorTokenByEmail } from "@/db/two-factor-token";
import { getUserByEmail } from "@/db/user.db";
import { defineAction, z } from "astro:actions";



export const verifyTwoFactorAuthentication = defineAction({
    accept: 'json',
    input: z.object({
        email: z.string().email({ message: "Must be a valid email" }),
        code: z.string().min(6, {
            message: "Code must be at least 6 characters.",
        }),
    }),
    handler: async (input, context) => {
        const { email, code } = input;
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error("User not found.");
        }

        if(!user.isTwoFactorEnabled) {
            throw new Error("Two-factor authentication is not enabled for this account.");
        }

        const twoFactorToken = await getTwoFactorTokenByEmail({ email: user.email });

        if (!twoFactorToken) {
            throw new Error("Two-factor authentication is not enabled for this account.");
        }
   
        if (twoFactorToken.token !== code) {
            throw new Error("Invalid verification code.");
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
            throw new Error("Verification code has expired.");
        }

        await deleteTwoFactorTokenTokenById({ id: twoFactorToken.id });

        const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);

        if (existingTwoFactorConfirmation) {
            await deleteTwoFactorConfirmationById(existingTwoFactorConfirmation.id);
        }

        await createTwoFactorConfirmation({
            userId: user.id,
        });

        return {
            status: 'success',
            message: 'Verification code sent successfully.',
            data: null,
        }
    }
});
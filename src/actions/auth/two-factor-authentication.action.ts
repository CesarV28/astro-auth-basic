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


        // TODO: Send verification code

        return {
            status: 'success',
            message: 'Verification code sent successfully.',
            data: null,
        }
    }
});
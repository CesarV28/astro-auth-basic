
import { defineAction, z } from "astro:actions";
import { createUser, getUserByEmail } from "@/db/user.db";
import { checkPasswordMatch } from "@/helpers/check-password-match";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationTokenEmail } from "@/lib/mail";



export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        email: z.string().email({ message: "Must be a valid email" }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        passwordConfirm: z.string(),
        remember_me: z.boolean().optional(),
    }),
    handler: async (input, context) => {
        const { name, email, password, remember_me, passwordConfirm } = input;

        const user = await getUserByEmail(email);

        if (user) {
            throw new Error("User already exists");
        }

        if (remember_me) {
            context.cookies.set('email', email, {
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                path: '/',
            });
        } else {
            context.cookies.delete('email', {
                path: '/',
            });
        }

        const passwordMatch = checkPasswordMatch({ password, passwordConfirm });
        if (!passwordMatch) {
            return {
                status: 'error',
                message: 'Passwords do not match',
                data: null,
            }
        }

        const response = await createUser({
            id: new Date().getTime().toString(),
            email,
            password,
            name,
        });

        if (response.status === 'error' || !response.data) {
            console.error(response.message);
            throw new Error(response.message);
        }

        const verificationToken = await generateVerificationToken(email);

        if (!verificationToken) {
            throw new Error("Error generating verification token");
        }

        // TODO: Send email verification
        await sendVerificationTokenEmail({
            email: verificationToken?.email,
            token: verificationToken?.token
        });

        return {
            status: response.status,
            message: response.message,
            data: response.data,
        }
    }
});


export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email({ message: "Must be a valid email" }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters.",
        }),
        remember_me: z.boolean().optional(),
    }),
    handler: async (input, context) => {
        const { email, password, remember_me } = input;
 
        const user = await getUserByEmail(email);

        if (!user) {
            throw new Error("User not found.");
        }

        const passwordMatch = user.password === password;
        if (!passwordMatch) {
            throw new Error("Passwords do not match");
        }

        if (remember_me) {
            context.cookies.set('email', email, {
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                path: '/',
            });
        } else {
            context.cookies.delete('email', {
                path: '/',
            });
        }

        if(user.isTwoFactorEnabled) {

            // TODO: Send verification code
            context.cookies.set('email', email, {
                // Set expiration time 12 hours from now
                expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
                path: '/auth/two-factor-authentication',
            });

            const twoFactorToken = await generateTwoFactorToken({ email: user.email });
            await sendTwoFactorTokenEmail({
                email: twoFactorToken?.email || '',
                token: twoFactorToken?.token || ''
            })


            return {
                status: 'verification',
                message: 'Two-factor authentication is enabled for this account. Please use the verification code sent to your email.',
                data: user,
            }
        }

        return {
            status: 'success',
            message: 'Login successful',
            data: user,
        }
    }
});

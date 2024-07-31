

import { createUser, getUserByEmail } from "@/db/user.db";
import { checkPasswordMatch } from "@/helpers/check-password-match";
import { defineAction, z } from "astro:actions";


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
            remember_me,
        });

        if (response.status === 'error') {
            console.error(response.message);
            throw new Error(response.message);
        }

        return {
            status: response.status,
            message: response.message,
            data: response.data,
        }
    }
});

// export const logoutUser = defineAction({
//     accept: 'json',
//     input: z.object({
//         redirect: z.string().optional(),
//     }),
//     handler: async (input, context) => {
//         const { redirect } = input;
//         console.log({ redirect });
//         signOut()

//         return {
//             status: 'success',
//             message: 'User logged out',
//             data: null,
//         }
//     }
// });

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
            return {
                status: 'error',
                message: 'User not found',
                data: null,
            }
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

        // const passwordMatch = checkEncryptedPasswordMatch({ password, encryptedPassword: user.password });
        // if (!passwordMatch) {
        //     return {
        //         status: 'error',
        //         message: 'Passwords do not match',
        //         data: null,
        //     }
        // }


        return {
            status: "success",
            message: "User logged in",
            data: {
                email: user.email,
            },
        }
    }
});
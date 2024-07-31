import { z } from "astro:actions";

export const LoginSchema = z.object({
    email: z.string().email().min(2, {
        message: "Must be a valid email.",
    }),
    password: z.string().min(2, {
        message: "Password must fill.",
    }),
    code: z.optional(z.string()),
});


export const ResetSchema = z.object({
    email: z.string().email().min(2, {
        message: "Must be a valid email.",
    }),
});


export const RegisterSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Must be a valid email" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    passwordConfirm: z.string(),
    remember_me: z.boolean().optional(),
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});


export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    passwordConfirm: z.string(),
}).refine(data => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
});
/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />


interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
    isTwoFactorEnabled: boolean;
}

declare namespace App {
    interface Locals {
        user: User | null;
        isLoggedIn: boolean;
    }
}

/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />


interface User {
    id: string;
    name: string;
    email: string;
    img: string;
    role: string;
}

declare namespace App {
    interface Locals {
        user: User | null;
        isLoggedIn: boolean;
    }
}

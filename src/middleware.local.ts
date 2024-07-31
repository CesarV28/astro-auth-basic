// IMPORTANT: This middleware is only for local development
// Example of middleware that checks for local authentication

import { defineMiddleware } from "astro:middleware";
import { PROTECTED_ROUTES } from "./constants/auth.ts";
import type { MiddlewareNext } from "astro";

export const onRequest = defineMiddleware((context, next) => {

    const url = context.url;
    const authHeaders = context.request.headers.get('authorization');

    if (PROTECTED_ROUTES.includes(url.pathname)) {
        return checkLocalAuth({ authHeaders, next });
    }

    return next();
});


const checkLocalAuth = async ({ authHeaders, next }: { authHeaders: string | null, next: MiddlewareNext }) => {
    if(authHeaders) {
        const authValue = authHeaders.split(' ')[1];
        const [username, password] = atob(authValue).split(':');
        if(username == 'admin' && password === 'admin') {
            return next();
        }
    }
    return new Response('Unauthorized', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    });
    
}
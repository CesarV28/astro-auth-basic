import { defineMiddleware } from "astro:middleware";
import { LOGIN_ROUTES, PROTECTED_ROUTES } from "./constants/auth.ts";

import { getSession } from 'auth-astro/server';



// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
    const session = await getSession(context.request);
    const isLoggedIn = session?.user ? true : false;
    const user = session?.user ? session.user : null;

    if (user && isLoggedIn) {
        context.locals.user = {
            id: user.id!,
            name: user.name!,
            email: user.email!,
            image: '',
            role: user.role!,
            isTwoFactorEnabled: user?.isTwoFactorEnabled as boolean,
        }
        context.locals.isLoggedIn = isLoggedIn;
    }

    if (!isLoggedIn && PROTECTED_ROUTES.includes(context.url.pathname)) {
        return context.redirect('/');
    }

    if (isLoggedIn && LOGIN_ROUTES.includes(context.url.pathname)) {
        return context.redirect('/');
    }
    
    return next();
});


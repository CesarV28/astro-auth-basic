import { DefaultUser, DefaultSession } from '@auth/core/types';

declare module '@auth/core/types' {

    interface User extends DefaultUser {
        role?: string;
        isOAuth?: boolean;
        image?: string;
        isTwoFactorEnabled?: boolean;
        isEmailVerified?: boolean;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}
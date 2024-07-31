import { getUserByEmail, getUserById } from '@/db/user.db';
import { LoginSchema } from '@/schemas/auth.schema';
import Credentials from '@auth/core/providers/credentials';
import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';
import bcryptjs from 'bcryptjs'

export default defineConfig({
    providers: [
        GitHub({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
    
                    if (!user || !user.password) {
                        return null;
                    }

                    // const passwordMatch = await bcryptjs.compare(password, user.password)

                    // if (passwordMatch) return user;
                    return user
                }

                return null;
            },
        })
    ],
    pages: {
        signIn: '/',
        signOut: '/auth/login',
    },
    events: {
        async linkAccount({ user }) {
            // await db.user.update({ 
            //     where: { id: user.id },
            //     data: { emailVerified: new Date() }
            // });
        },
    },
    callbacks: {
        async signIn({ user, account }) {

            // Allow 0Auth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id || '');

            // Prevent singin without emailVerification
            // if(!existingUser || !existingUser.emailVerified) {
            //     return false;
            // }

            // if( existingUser.isTwoFactorEnabled ) {
            //     const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            //     if(!twoFactorConfirmation) return false;

            //     await deleteTwoFactorConfirmationById(twoFactorConfirmation.id);
            // }

            return true;
        },
        async session({ token, session }) {

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.roles && session.user) {
                // session.user.roles = token.roles;
            }

            if (session.user) {
                session.user.name = token.name;
                // session.user.email = token.email;
                // session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
                // session.user.isOAuth = token.isOAuth;
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getUserById(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            // token.roles = existingUser.roles;
            // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

            return token;
        }
    },
    session: { strategy: 'jwt' },
});
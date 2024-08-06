import { v4 as uuidV4 } from 'uuid';
import { createTwoFactorToken, deleteTwoFactorTokenTokenById, getTwoFactorTokenByEmail } from "@/db/two-factor-token";
import { createPasswordResetToken, deletePasswordResetTokenById, getPasswordResetTokenByEmail } from '@/db/password-reset-token';
import { createVerificationToken, deleteVerificationTokenById, getVerificationTokenByEmail } from '@/db/verification-token';


export const generateTwoFactorToken = async ({ email }: { email: string }): Promise<any> => {

    // IMPORTANT: This is a random number generator that is not cryptographically secure.
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken = await getTwoFactorTokenByEmail({ email });

    if( existingToken ) {
        await deleteTwoFactorTokenTokenById({ id: existingToken.id });
    }

    const twoFactorToken = await createTwoFactorToken({ email, token, expires });

    return twoFactorToken;
}

export const generatePasswordVerificationToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if( existingToken ) {
        await deletePasswordResetTokenById(existingToken.id);
    }

    const passwordResetToken =await createPasswordResetToken({
        email,
        expires,
        token
    });

    return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if( existingToken ) {
        await deleteVerificationTokenById(existingToken.id);
    }

    const verificationToken = await createVerificationToken({ 
        email, 
        token, 
        expires 
    });

    return verificationToken;
}
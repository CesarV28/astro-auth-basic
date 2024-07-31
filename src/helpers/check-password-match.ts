import bcryptjs from 'bcryptjs';

export const checkPasswordMatch = ({ password, passwordConfirm }: { password: string, passwordConfirm: string }) => {
    if (password !== passwordConfirm) {
        return false;
    }
    return true;
}

export const checkEncryptedPasswordMatch = ({ password, encryptedPassword }: { password: string, encryptedPassword: string }) => {
    if (!bcryptjs.compareSync(password, encryptedPassword)) {
        return false;
    }
    return true;
}
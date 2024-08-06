interface PasswordResetToken {
    id: string
    email: string
    token: string
    expires: Date
}

export const getPasswordResetTokenByToken = async (token: string): Promise<PasswordResetToken | null> => {
    try {
        const passwordToken = {
            id: "",
            email: "",
            token: "",
            expires: new Date()
        }

        return passwordToken;
    } catch (error) {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: string): Promise<PasswordResetToken | null> => {
    try {
        const passwordToken = { 
            id: "",
            email: "",
            token: "",
            expires: new Date()
        }

        return passwordToken;
    } catch (error) {
        return null;
    }
}

export const createPasswordResetToken = async (values: Omit<PasswordResetToken, 'id'>): Promise<PasswordResetToken | null> => {
    try {
        const newPasswordResetToken = {
            id: "",
            ...values
        }

        return newPasswordResetToken;
    } catch (error) {
        return null;
    }
}

export const deletePasswordResetTokenById = async (id: string): Promise<string | null> => {
    try {
        // TODO: Delete the record from the database

        return id;
    } catch (error) {
        return null;
    }
}
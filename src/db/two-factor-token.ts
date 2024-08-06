

interface TwoFactorToken {
    id: string
    email: string
    token: string
    expires: Date
}

export const getTwoFactorTokenByToken = async ({ token }: { token: string }): Promise<TwoFactorToken | null> => {
    try {
        const twoFactorToken: TwoFactorToken = {
            id: "",
            email: "",
            token: "",
            expires: new Date()
        }

        return twoFactorToken;
    } catch (error) {
        return null;
    }
}

export const getTwoFactorTokenByEmail = async ({ email }: { email: string }): Promise<TwoFactorToken | null> => {
    try {
        const twoFactorToken = {
            id: "",
            email: "",
            token: "",
            expires: new Date()
        }

        return twoFactorToken;
    } catch (error) {
        return null;
    }
}

export const createTwoFactorToken = async (values: Omit<TwoFactorToken, 'id'>): Promise<TwoFactorToken | null> => {
    try {
        const newTwoFactorToken = {
            id: "",
            ...values
        };

        return newTwoFactorToken;
    } catch (error) {
        return null;
    }
}

export const deleteTwoFactorTokenTokenById = async ({ id }: { id: string }): Promise<string | null> => {
    try {
        
        // TODO: Delete the record from the database

        return id;
    } catch (error) {
        return null;
    }
}
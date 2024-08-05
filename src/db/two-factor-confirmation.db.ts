

interface TwoFactorConfirmation {
    id: string   
    email: string
    token: string
    expires: Date
}


export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation: TwoFactorConfirmation = {
            id: "",
            email: "",
            token: "",
            expires: new Date()
        }

        return twoFactorConfirmation;
    } catch (error) {
        return null;
    }
}

export const createTwoFactorConfirmation = async (values: Omit<TwoFactorConfirmation, 'id'>) => {
    try {
        // TODO: Create a new record in the database
    } catch (error) {
        console.log(error)
    }
}

export const deleteTwoFactorConfirmationById = async (id: string) => {
    try {
        const twoFactorConfirmation = {
            id: "",
            email: "",
            token: "",
            expires: new Date()
        }

        if (!twoFactorConfirmation) return null;

        // TODO: Delete the record from the database

        return twoFactorConfirmation;
    } catch (error) {
        return null;
    }
}
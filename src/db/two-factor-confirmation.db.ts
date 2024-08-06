

interface TwoFactorConfirmation {
    id: string   
    userId: string
}


export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        const twoFactorConfirmation: TwoFactorConfirmation = {
            id: "",
            userId: "",
        }

        return twoFactorConfirmation;
    } catch (error) {
        return null;
    }
}

export const createTwoFactorConfirmation = async (values: Omit<TwoFactorConfirmation, 'id'>) => {
    try {
        // TODO: Create a new record in the database

        return values;
    } catch (error) {
        console.log(error)
    }
}

export const deleteTwoFactorConfirmationById = async (id: string) => {
    try {
        const twoFactorConfirmation =  id
        if (!twoFactorConfirmation) return null;

        // TODO: Delete the record from the database

        return id;
    } catch (error) {
        return null;
    }
}
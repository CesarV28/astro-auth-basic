
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    remember_me?: boolean;
}

interface ReturnMessage<T> {
    status: string;
    message: string;
    data: T | null;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = {
            id: "1",
            email,
            name: "Cesar Vargas",
            password: "123456",
            remember_me: false,
        }
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        })
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const user = {
            id,
            email: "cesarvargas@gmail.com",
            name: "Cesar Vargas",
            password: "123456",
            remember_me: false,
        }
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const createUser = async (user: User): Promise<ReturnMessage<User>> => {
    try {
        return {
            status: "success",
            message: "User created successfully",
            data: user,
        };
    } catch (error) {
        console.error(error);
        return {
            status: "error",
            message: "Error creating user",
            data: null,
        };
    }
}
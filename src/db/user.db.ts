
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    role: string;
    isAuth0: boolean;
    isTwoFactorEnabled: boolean;
    emailVerified: boolean;
}

interface ReturnMessage<T> {
    status: string;
    message: string;
    data: T | null;
}

const mockUser: AuthUser = {
    id: "1",
    email: "johndoe@example.com",
    name: "John Doe",
    password: "123456",
    image: "",
    role: "admin",
    isAuth0: false,
    isTwoFactorEnabled: true,
    emailVerified: true,
}

export const getUserByEmail = async (email: string): Promise<AuthUser | null> => {
    try {

        // TODO: Get user from database
        const user: AuthUser = mockUser

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

export const getUserById = async (id: string): Promise<AuthUser | null> => {
    try {
        // TODO: Get user from database
        const user: AuthUser = mockUser

        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}


interface NewUser {
    id: string;
    email: string;
    name: string;
    password: string;
}

export const createUser = async (user: NewUser): Promise<ReturnMessage<AuthUser>> => {
    try {

        const newUser: AuthUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            isTwoFactorEnabled: false,
            isAuth0: false,
            image: "",
            role: "",
            emailVerified: false
        }

        // TODO: Save user to database

        return {
            status: "success",
            message: "User created successfully",
            data: newUser,
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
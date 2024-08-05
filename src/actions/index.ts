import { registerUser, loginUser } from "./auth/auth.action";
import { verifyTwoFactorAuthentication } from "./auth/two-factor-authentication.action";


export const server = {
    // Authentication
    registerUser,
    loginUser,
    verifyTwoFactorAuthentication,
}
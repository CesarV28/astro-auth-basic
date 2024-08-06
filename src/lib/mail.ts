

export const sendTwoFactorTokenEmail = async ({ email, token }: { email: string, token: string }) => {
    try {

        // await resend.emails.send({
        //     from: 'Email by Auth NextJs Template <onboarding@resend.dev>',
        //     to: [email],
        //     subject: 'Next Auth Template 2FA Code',
        //     html: `<p>Your 2FA code <strong>${token}</strong></p>`,
        //     text: 'it works!',
        // });
   
    } catch (error) {
        console.log(error)
    }
}


export const sendPasswordResetTokenEmail = async ({ email, token }: { email: string, token: string }) => {
    try {
        const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

        // await resend.emails.send({
        //     from: 'Email by Auth NextJs Template <onboarding@resend.dev>',
        //     to: [email],
        //     subject: 'Next Auth Template Reset Password',
        //     html: `<p>Reset yout password clicking here <a href="${resetLink}" ><strong>Reset Password</strong></a>!</p>`,
        //     text: 'it works!',
        // });
   
    } catch (error) {
        console.log(error)
    }
}


export const sendVerificationTokenEmail = async ({ email, token }: { email: string, token: string }) => {
    try {
        const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

        // await resend.emails.send({
        //     from: 'Email by Auth NextJs Template <onboarding@resend.dev>',
        //     to: [email],
        //     subject: 'Next Auth Template Confirm email',
        //     html: `<p>Congrats click here to <a href="${confirmLink}" ><strong>confirm email</strong></a>!</p>`,
        //     text: 'it works!',
        // });
   
    } catch (error) {
        console.log(error)
    }
}
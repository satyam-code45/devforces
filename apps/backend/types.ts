import z, { email } from "zod"

export const SigninSchema = z.object({
    email: z.email()
})
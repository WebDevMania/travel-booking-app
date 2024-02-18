import { z } from "zod"

const schema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().email("Invalid email address").min(1, { message: "Email is required" })
})

export {
    schema
}
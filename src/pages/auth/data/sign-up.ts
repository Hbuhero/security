import z from "zod";

export const formSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

export type FormSchema = z.infer<typeof formSchema>;
import * as z from "zod"

export const userAuthLoginSchema = z.object({
    username: z.string().min(3, {message: "User name must contain at least 3 character(s)"}),
    password: z.string().min(1, {message: 'Password is required'})
})

export const userAuthSignupSchema = z.object({
    username: z.string().min(3, {message: "User name must contain at least 3 character(s)"}),
    email: z.string().email(),
    password1: z.string().min(8, {message: "Password must contain at least 8 character(s)"}).max(100),
    password2: z.string().min(8, {message: "Confirm Password must contain at least 8 character(s)"}).max(100),
}).refine((data) => data.password1 === data.password2, {
    message: "Passwords don't match",
    path: ["password2"],
});

export const profileFormSchema = z.object({
    firstName: z.string({required_error: 'First name is required'})
        .refine(value => !/^\s/.test(value), {
            message: 'The first character must not be a space',
        })
        .refine(value => value.trim().length >= 3, {
            message: 'First Name must be at least 3 characters',
        }),
    lastName: z.string({required_error: 'Last name is required'})
        .refine(value => !/^\s/.test(value), {
            message: 'The first character must not be a space',
        })
        .refine(value => value.trim().length >= 3, {
            message: 'Last Name must be at least 3 characters',
        }),
    // email: z.string({required_error: 'Email is required'}).email('Please enter a valid email'),
    email: z.string().optional(),
    image: z.string().optional()
})
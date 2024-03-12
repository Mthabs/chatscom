import * as z from "zod";

export const userProfileUpdateSchema = z.object({
    username: z.string({required_error: "Username is required"})
        .min(3,{message: "Username content must contain at least 3 character(s)"}),
    first_name: z.string({required_error: 'First name is required'})
        .refine(value => !/^\s/.test(value), {
            message: 'The first character must not be a space',
        })
        .refine(value => value.trim().length >= 3, {
            message: 'First Name must be at least 3 characters',
        }),
    last_name: z.string({required_error: 'Last name is required'})
        .refine(value => !/^\s/.test(value), {
            message: 'The first character must not be a space',
        })
        .refine(value => value.trim().length >= 3, {
            message: 'Last Name must be at least 3 characters',
        }),
})
import * as z from "zod";

export const videoCreateSchema = z.object({
    title: z.string({required_error:"Title is required"})
        .min(3, {message: "Title must contain at least 3 character(s)"}),
    description: z.string({required_error:"Description is required"})
        .min(3, {message: "Description must contain at least 3 character(s)"}),
    video_file:z.any()
})
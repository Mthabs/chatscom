import * as z from "zod"

const ACCEPTED_IMAGE_MIME_TYPES = [
    "jpeg",
    "jpg",
    "png",
    "webp",
];
export const postSchema = z.object({
    content: z.string().min(3, {message: "Post content must contain at least 3 character(s)"}),
    post_picture: z.any()
        .refine(
            (files) => {
                if (files) {
                    return ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type.split("/")[1])
                } else {
                    return true;
                }
            },
            {
                message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
            }
        )
})

export const commentSchema = z.object({
    content: z.string().min(3, {message: "Post comment content must contain at least 3 character(s)"}),
})
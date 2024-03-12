import * as z from "zod"

const ACCEPTED_IMAGE_MIME_TYPES = [
    "jpeg",
    "jpg",
    "png",
    "webp",
];
export const photoSchema = z.object({
    caption: z.string({required_error:"Caption is required"})
        .min(3, {message: "Caption must contain at least 3 character(s)"}),
    image: z.any()
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
export const photo1Schema = z.object({
    caption: z.string({required_error:"Caption is required"})
        .min(3, {message: "Caption must contain at least 3 character(s)"})
})
import * as z from "zod";

export const formSchema = z.object({
    title: z.string().min(5, { message: "Title is required & is too Short!" }),
    description: z.string().min(10, { message: "Description is required & is too Short!!" }),
})

// Define Zod schema for each form field
export const fieldSchema = z.object({
    fieldName: z.string(),
    fieldTitle: z.string(),
    fieldType: z.enum(['text', 'email', 'number', 'tel', 'select', 'checkbox', 'radio']),
    placeholder: z.string(),
    label: z.string(),
    required: z.boolean().default(false),
    options: z.array(z.string()).optional(), // Only for 'select', 'radio'
});
"use server";
import { checkoutFormSchema, CheckoutFormValues } from "@/schemas/checkout";
import { z } from "zod";

export const checkoutTier = async (values: z.infer<typeof checkoutFormSchema>, userId: string) => {
    const isValidated = checkoutFormSchema.safeParse(values);

    if(!isValidated.success) return { error: isValidated.error.errors[0].message };

    const {emailOrPhone, newsletter, firstName, lastName, screenshot, plan} = isValidated.data;

    try {
        console.log(emailOrPhone, newsletter, firstName, lastName, screenshot, plan);
        return {success: true, message: "Checkout Successfully!!"}
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { error: "An unexpected error occurred", message: String(error) };
    }
};
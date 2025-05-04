"use server";

import { formSchema } from "@/schemas/form"
import { db } from "@/utils/db"
import { chatSession } from "@/utils/gemini"
import { Forms, User } from "@/utils/schema"
import { and, desc, eq } from "drizzle-orm"
import moment from 'moment'
import * as z from "zod"
import { v4 as uuidv4 } from 'uuid';

export const generateform = async (values: z.infer<typeof formSchema>, userId: string) => {
    const validatedFields = formSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }
    const { title, description } = validatedFields.data
    const InputPrompt = `title:${title}, description:${description}, Description: Next.js, React Workshop, On basis of title & description create JSON form with formTitle, formHeading along with fieldName, FieldTitle, FieldType, Placeholder, label, required fields, and checkbox and select field type options will be in array only and in JSON format`
    try {
        const result = await chatSession.sendMessage(InputPrompt);
        const FormResponse = (result.response.text()).replace('```json', '').replace('```', '');
        console.log(`FormResponse : ${FormResponse}`)
        if (FormResponse) {
            const user = await db.select().from(User).where(eq(User.clerkId, userId));

            const response = await db.insert(Forms).values({
                jsonFormResp: FormResponse,
                user_id: user[0].id,
                formID: uuidv4(),
                createdAt: moment().format('DD/MM/yyyy') // Corrected date format
            }).returning({ formId: Forms.formID })

            return { res: response[0].formId, success: "Form generated successfully" }
        } else {
            return { error: "Something went wrong in Form" }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const getFormsData = async (userId: string) => {
    try {
        const users = await db.select().from(User).where(eq(User.clerkId, userId));
        const response: FormParams[] = await db.select().from(Forms)
        .where(eq(Forms.user_id, users[0].id))
        .orderBy(desc(Forms.id));
        return { success: response }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const getFormById = async (formId: string, userID: string) => {
    try {
        const users = await db.select().from(User).where(eq(User.clerkId, userID));
        const response: FormParams[] = await db.select().from(Forms)
        .where(and(eq(Forms.formID, formId), eq(Forms.user_id, users[0].id)));
        return { success: response[0] }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const updateFields = async (formParams: string, form_id: string, user_id:string) => {
    try {
        const users = await db.select().from(User).where(eq(User.clerkId, user_id));
        const response = await db.update(Forms).
        set({
            jsonFormResp: formParams,
        })
        .where(and(eq(Forms.formID, form_id), eq(Forms.user_id, users[0].id)))

        if(response){
            return { success: "Form updated successfully" }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
};


export const updateControllerFields = async (value: string, column: string, form_id: string, user_id:string) => {
    try {
        const users = await db.select().from(User).where(eq(User.clerkId, user_id));
        const response = await db.update(Forms).set({
            [column]: value
        }).where(and(eq(Forms.formID, form_id), eq(Forms.user_id, users[0].id)))
        .returning({ id: Forms.id })

        if(response){
            return { success: "Form updated successfully" }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}
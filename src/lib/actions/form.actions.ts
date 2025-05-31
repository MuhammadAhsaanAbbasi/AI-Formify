"use server";
import { formSchema } from "@/schemas/form"
import { db } from "@/utils/db"
import { chatSession } from "@/utils/gemini"
import { Forms, User, userResponses } from "@/utils/schema"
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
    const InputPrompt = `title:${title}, description:${description}.\n 
    Based on the title and description, create a JSON Object of form data with formTitle, formHeading, and their 
    respective fields. In each field includes fieldName, FieldTitle, FieldType, Placeholder, label, required fields, 
    and checkbox and select field type options will be in an array only and JSON format`
    try {
        const result = await chatSession(InputPrompt)
        console.log(`FormResponse : ${result}`)
        if (result) {
            const user = await db.select().from(User).where(eq(User.clerkId, userId));

            const response = await db.insert(Forms).values({
                jsonFormResp: result,
                user_id: user[0].id,
                mockID: uuidv4(),
                createdAt: moment().format('DD/MM/yyyy') // Corrected date format
            }).returning({ mockID: Forms.mockID })

            return { res: response[0].mockID, success: "Form generated successfully" }
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
        // console.log(`limit : ${users[0].limit}`); 
        return { success: response, limit: users[0].limit }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const getFormsResponses = async (formId: number) => {
    try {
        const form = await db.select().from(Forms).where(eq(Forms.id, formId));
        const response = await db.select().from(userResponses)
            .where(eq(userResponses.form_id, form[0].id))
            .orderBy(desc(userResponses.id));
        return { success: response }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const getFormById = async (mockID: string, userID: string) => {
    try {
        const users = await db.select().from(User).where(eq(User.clerkId, userID));
        const response: FormParams[] = await db.select().from(Forms)
            .where(and(eq(Forms.user_id, users[0].id), eq(Forms.mockID, mockID)));
        return { success: response[0] }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const getFormByMockId = async (mockID: string) => {
    try {
        const response: FormParams[] = await db.select().from(Forms)
            .where(eq(Forms.mockID, mockID));
        return { success: response[0] }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}


export const updateFields = async (formParams: string, form_id: string, user_id: string) => {
    try {
        const users = await db.select().from(User).where(eq(User.clerkId, user_id));
        const response = await db.update(Forms).
            set({
                jsonFormResp: formParams,
            })
            .where(and(eq(Forms.mockID, form_id), eq(Forms.user_id, users[0].id)))

        if (response) {
            return { success: "Form updated successfully" }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
};


export const updateControllerFields = async (value: unknown, column: string, form_id: string, user_id: string) => {
    try {
        const users = await db.select().from(User).where(eq(User.clerkId, user_id));
        const response = await db.update(Forms).set({
            [column]: value
        }).where(and(eq(Forms.mockID, form_id), eq(Forms.user_id, users[0].id)))
            .returning({ id: Forms.id })

        if (response) {
            return { success: "Form updated successfully" }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}

export const formResponseSubmit = async (jsonFormData: ResponseFormField[], form_id: string) => {
    try {
        console.log(`form_id : ${form_id}`)
        const req = await db.select().from(Forms).where(eq(Forms.mockID, form_id));

        console.log(`req : ${req[0]?.id}`)
        
        const result=await db.insert(userResponses)
        .values({
          jsonResponse: JSON.stringify(jsonFormData),
          createdAt:moment().format('DD/MM/yyy'),
          form_id: req[0].id,
        })

        if (result) {
            return { success: "Form submitted successfully" }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
}
"use server";

import { redirect } from 'next/navigation'
import Stripe from "stripe";
import { handleError } from '../utils';
import { updateCredits } from './user.actions';
import { db } from '@/utils/db';
import { Transactions } from '@/utils/schema';
import moment from 'moment';
// import { connectToDatabase } from '../database/mongoose';
// import Transaction from '../database/models/transaction.model';
import { checkoutFormSchema } from "@/schemas/checkout";
import { z } from "zod";

export async function checkoutCredits(transaction: CheckoutTransactionParams) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const amount = transaction.amount * 100;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: amount,
                    product_data: {
                        name: transaction.plan,
                    }
                },
                quantity: 1
            }
        ],
        metadata: {
            plan: transaction.plan,
            limit: transaction.limit,
            buyerId: transaction.buyerId,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/dashboard`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/`,
    })

    redirect(session.url!)
}

export async function createTransaction(transaction: CreateTransactionParams) {
    try {
        // await connectToDatabase();

        // Create a new transaction with a buyerId
        const newTransaction = await db.insert(Transactions)
            .values({
                ...transaction,
                createdAt: moment().format('DD/MM/yyyy')
            })
            .returning();

        await updateCredits(transaction.buyerId, transaction.limit);

        return JSON.parse(JSON.stringify("Transaction created successfully"));
    } catch (error) {
        handleError(error)
    }
}


export const checkoutTier = async (userId: string, formData: FormData) => {
    const screenshotFile = formData.get("screenshot") as File | null;

    const data = {
        emailOrPhone: (formData.get("emailOrPhone") as string | null) ?? "",
        newsletter: formData.get("newsletter") === "true"          // <- coerce
            || formData.get("newsletter") === "on",
        firstName: (formData.get("firstName") as string | null) ?? "",
        lastName: (formData.get("lastName") as string | null) ?? "",
        plan: (formData.get("plan") as string | null) ?? "",
        screenshot: screenshotFile,                                 // File | null
    };

    const validated = checkoutFormSchema.safeParse(data);

    if (!validated.success) {
        return { error: validated.error.errors[0].message };
    }
    const { emailOrPhone, newsletter, firstName, lastName, screenshot, plan } = validated.data;

    try {
        console.log(emailOrPhone, newsletter, firstName, lastName, screenshot, plan, userId);
        return { success: true, message: "Checkout Successfully!!" }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
};
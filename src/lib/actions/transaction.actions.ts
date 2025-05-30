"use server";

import { redirect } from 'next/navigation'
import Stripe from "stripe";
import { handleError } from '../utils';
import { getUserById, updateCredits } from './user.actions';
import { db } from '@/utils/db';
import { NewTransaction, Transactions } from '@/utils/schema';
import moment from 'moment';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { s3 } from "@/lib/utils";
import { checkoutFormSchema } from "@/schemas/checkout";
import { z } from "zod";
import { tiers } from '@/constants/constants';

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
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
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
        const filterTier = tiers.filter((tier) => tier.name === plan)[0];
        const amount = filterTier.price.replace("$", "");
        if (screenshot) {
            const arrayBuffer = await screenshot.arrayBuffer();                  // Node 20+
            const Key = `checkouts/${screenshot.name.split(".")[0]}`;

            // PutObject (≤ 5 MiB) or Multipart Upload automatically
            const upload = new Upload({
                client: s3,
                params: {
                    Bucket: process.env.AWS_S3_BUCKET!,
                    Key,
                    Body: Buffer.from(arrayBuffer),
                    ContentType: screenshot.type,
                    ACL: "public-read",           // remove if bucket is private
                },
            });
            await upload.done();                                 // handles retries

            // ---------- 3.  Build a URL ----------
            const screenshotUrl = process.env.AWS_S3_PUBLIC === "true"
                ? `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`
                : await getSignedUrl(s3, new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET!, Key }), { expiresIn: 60 * 60 }); // 1 h URL

            console.log(emailOrPhone, newsletter, firstName, lastName, screenshotUrl, plan, userId);

            const buyer = await getUserById(userId);
            if (!buyer) return { error: "User not found" };

            const tx: NewTransaction = {
                stripeId: "checkout",
                amount: Number(amount),
                limit: filterTier.limit,
                plan: plan,
                buyerId: buyer.id,
                screenshot: screenshotUrl,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
            }

            const transaction = await db.insert(Transactions)
            .values(tx)
            .returning({id:Transactions.id});

            if (!transaction) return { error: "Transaction failed" };
            
            return { success: true, message: "Checkout Successfully!!" }
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: "Invalid credentials!", message: error.message };
        }
        return { message: error }
    }
};
/* eslint-disable camelcase */
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getUserById } from "@/lib/actions/user.actions";
import moment from "moment";
import { NextResponse } from "next/server";
import stripe from "stripe";

export async function POST(request: Request) {
    const body = await request.text();

    const sig = request.headers.get("stripe-signature") as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;
    
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        return NextResponse.json({ message: "Webhook error", error: err });
    }

    // Get the ID and type
    const eventType = event.type;

    // CREATE
    if (eventType === "checkout.session.completed") {
        const { id, amount_total, metadata } = event.data.object;
        const buyerId = metadata?.buyerId as string;

        const user = await getUserById(buyerId);

        if (!user) {
            return NextResponse.json({ message: "User not found" });
        }

        const transaction = {
            stripeId: id,
            amount: amount_total ? amount_total / 100 : 0,
            plan: metadata?.plan || "",
            limit: Number(metadata?.limit) || 0,
            buyerId: user.id,
            createdAt: moment().format('DD/MM/yyyy'),
        };

        const newTransaction = await createTransaction(transaction);

        return NextResponse.json({ message: "OK", transaction: newTransaction });
    }

    return new Response("", { status: 200 });
}
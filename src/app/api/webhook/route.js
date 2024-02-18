import db from "@/lib/db";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const { default: Stripe } = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16"
})

export async function POST(req) {
    const sig = headers().get("stripe-signature")

    const body = await req.text()

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        return NextResponse.error(error)
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object
        const paymentIntentId = session.payment_intent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        const chargeId = paymentIntent.latest_charge

        const {
            startDate,
            endDate,
            listingId,
            pricePerNight,
            daysDifference,
            userId
        } = session.metadata

        const reservedDates = getDatesInRange(startDate, endDate)

        const reservationData = {
            userId,
            listingId,
            startDate,
            endDate,
            chargeId,
            reservedDates,
            daysDifference: Number(daysDifference)
        }

        const newReservation = await db.reservation.create({
            data: reservationData
        })

        // Send email functionality
        return NextResponse.json(newReservation)
    }
}
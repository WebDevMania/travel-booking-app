import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16"
})

export async function POST(req) {
    try {
        const {
            listing: { name, pricePerNight, id: listingId },
            startDate,
            endDate,
            daysDifference
        } = await req.json()

        const stripe_obj = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name
                    },
                    unit_amount: pricePerNight * 100
                },
                quantity: daysDifference
            }
        ]

        const currentUser = await getCurrentUser()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: stripe_obj,
            mode: "payment",
            success_url: "http://localhost:3000/success-page",
            cancel_url: "http://localhost:3000",
            metadata: {
                startDate,
                endDate,
                listingId,
                pricePerNight,
                daysDifference,
                userId: currentUser.id,
                email: currentUser.email
            }
        })

        return NextResponse.json({ sessionId: session.id })
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const chargeId = searchParams.get("charge_id")
        const reservationId = searchParams.get("reservation_id")

        const refundedPayment = await stripe.refunds.create({
            charge: chargeId
        })

        console.log(refundedPayment)
        if(refundedPayment.status !== "succeeded"){
            return NextResponse.error({
               error: "Can't cancel the reservation with an id of " + reservationId
            })
        }

        return NextResponse.json({message: "Successfully cancelled the reservation"})
    } catch (error) {
        return NextResponse.error(error)
    }
}
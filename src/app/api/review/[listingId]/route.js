import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
    try {
        const { listingId } = ctx.params

        const listing = await db.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                reviews: true
            }
        })

        const reviewsIds = listing.reviews.map(({ id }) => id)

        const reviews = await db.review.findMany({
            where: {
                id: {
                    in: reviewsIds
                }
            },
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(reviews, { status: 200 })
    } catch (error) {
        return NextResponse.error(error)
    }
}
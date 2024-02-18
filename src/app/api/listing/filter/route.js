import db from "@/lib/db";
import { calcAndSortListings } from "@/lib/sortListings";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)

        const location = searchParams.get("location")
        const min_price = Number(searchParams.get("min_price"))
        const max_price = Number(searchParams.get("max_price"))
        const type = searchParams.get("type")

        const listings = await db.listing.findMany({
            where: {
                pricePerNight: {
                    gte: min_price,
                    lte: max_price
                },
                location,
                type
            },
            include: {
                reviews: true
            }
        })

        console.log(listings)
        const sortedListings = calcAndSortListings(listings)
        console.log(sortedListings)
        return NextResponse.json(sortedListings)
    } catch (error) {
        return NextResponse.error(error)
    }
}
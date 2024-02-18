import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser()

        const allListings = await db.listing.findMany({
            include: {
                reservations: true
            }
        })

        const mostReservedListing = allListings.reduce((a, b) => {
            return a?.reservations?.length >= b?.reservations?.length ? a : b
        })

        return NextResponse.json(mostReservedListing)
    } catch (error) {
        return NextResponse.error(error)
    }
}
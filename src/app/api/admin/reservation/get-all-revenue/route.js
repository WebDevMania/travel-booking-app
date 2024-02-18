import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser()

        const allReservations = await db.reservation.findMany({
            include: {
                listing: true
            }
        })

        if (allReservations.length === 0) return NextResponse.json(0)

        const allReservationsPrices = allReservations.map((reservation) => {
            return reservation.daysDifference * reservation.listing.pricePerNight
        })

        const totalRevenue = allReservationsPrices.reduce((a, b) => a + b)

        return NextResponse.json(totalRevenue)
    } catch (error) {
        return NextResponse.error(error)
    }
}
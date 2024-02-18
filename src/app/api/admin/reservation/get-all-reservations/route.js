import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser()

        const getAllReservations = await db.reservation.findMany({
            include: {
                listing: true,
                user: true
            }
        })

        const allReservationsTotalPrice = getAllReservations.map((reservation) => {
            return {
                ...reservation,
                totalPrice: reservation.daysDifference * reservation.listing.pricePerNight
            }
        })

        return NextResponse.json(allReservationsTotalPrice)
    } catch (error) {
        return NextResponse.error(error)
    }
}
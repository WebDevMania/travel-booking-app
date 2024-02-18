import db from "@/lib/db";
import { NextResponse } from "next/server";
import isAdminUser from "@/lib/isAdminUser";

export async function GET(req){
    try {
        const listings = await db.listing.findMany({
            take: 10
        })

        return NextResponse.json(listings)
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function POST(req) {
    try {
        await isAdminUser()

        const body = await req.json()
        Object.values(body).forEach((v) => {
            if (v === "") return NextResponse.error({ message: "Fill all fields!" })
        })

        const {
            name,
            location,
            desc,
            type,
            pricePerNight,
            beds,
            hasFreeWifi,
            imageUrls
        } = body

        const newListing = await db.listing.create({
            data: {
                name,
                location,
                desc,
                type,
                pricePerNight,
                beds,
                hasFreeWifi,
                imageUrls
            }
        })

        return NextResponse.json(newListing)
    } catch (error) {
        return NextResponse.error(error)
    }
}
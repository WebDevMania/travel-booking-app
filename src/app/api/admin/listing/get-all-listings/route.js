import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser()

        const allListings = await db.listing.findMany({})

        return NextResponse.json(allListings)
    } catch (error) {
        return NextResponse.error(error)
    }
}
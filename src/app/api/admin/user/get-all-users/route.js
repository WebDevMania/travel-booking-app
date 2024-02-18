import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await isAdminUser()

        const allUsers = await db.user.findMany({})

        return NextResponse.json(allUsers)
    } catch (error) {
        return NextResponse.error(error)
    }
}
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";

export async function DELETE(req, ctx) {
    try {
        // i did ctx.params.id
        const { id } = ctx.params
        console.log(id)
        const currentUser = await getCurrentUser()
        console.log(currentUser, "current user")

        const reservation = await db.reservation.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        })
        console.log(reservation)

        if (reservation.user.id !== currentUser.id && !currentUser.isAdmin) {
            return NextResponse.error({
                message: "User has no permissions to cancel the reservation"
            })
        }

        await db.reservation.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: "Successfully deleted reservation with id of " + id }, { status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }
}
import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";

export async function GET(req, ctx) {
    try {
        await isAdminUser()

        const { id } = ctx.params

        const user = await db.user.findUnique({
            where: { id }
        })

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function PUT(req, ctx) {
    try {
        await isAdminUser()
        const { id } = ctx.params
        const body = await req.json()

        const updatedUser = await db.user.update({
            data: {
                ...body
            },
            where: { id }
        })

        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.error(error)
    }
}

export async function DELETE(req, ctx) {
    try {
        await isAdminUser()
        const { id } = ctx.params

        const deletedUser = await db.user.delete({
            where: { id }
        })

        if (deletedUser) {
            return NextResponse.json({ message: "User has been successfully deleted!" }, { status: 200 })
        } else {
            return NextResponse.json({ message: `User with the id of ${id} doesn't exist!` })
        }
    } catch (error) {
        return NextResponse.error(error)
    }
}
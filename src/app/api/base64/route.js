import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder"

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const url = searchParams.get("url")

        const buffer = await fetch(url).then(async (res) => {
            return Buffer.from(await res.arrayBuffer())
        })

        const { base64 } = await getPlaiceholder(buffer)

        return NextResponse.json(base64)
    } catch (error) {
        return NextResponse.error(error)
    }
}
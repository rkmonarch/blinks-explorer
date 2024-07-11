import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(
    req: NextRequest,
) {
    const address = req.nextUrl.searchParams.get("address");

    try {
        const user = await prisma.user.findFirst({
            where: {
                address: address,
            },
        });
        return NextResponse.json(JSON.stringify(user), {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(JSON.stringify({ message: "Internal server error" }), {
            status: 400
        })
    }
}

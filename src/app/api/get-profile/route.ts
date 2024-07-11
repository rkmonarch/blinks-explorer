import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
) {
    const address = req.nextUrl.searchParams.get("address");

    try {
        const user = await prisma.user.findFirst({
            where: {
                address: address as string,
            },
        });
        return NextResponse.json(user, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, {
            status: 400
        })
    }
}

import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
) {
    const link = req.nextUrl.searchParams.get("link");

    try {
        const exists = await prisma.blink.findFirst({
            where: {
                blink: link as string,
            },
        });
        if (exists) {
            return NextResponse.json(exists, {
                status: 200
            })
        } else {
            return NextResponse.json(exists, {
                status: 404
            })
        }
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, {
            status: 500
        })
    }
}

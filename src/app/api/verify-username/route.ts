import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest, res: NextResponse) {
    const username = req.nextUrl.searchParams.get("username");

    try {
        const existingUsername = await prisma.user.findFirst({
            where: {
                username: username as string,
            },
        });

        return NextResponse.json({
            isTaken: existingUsername ? true : false
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, {
            status: 400
        })
    }
}
import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest, res: NextResponse) {
    const username = req.nextUrl.searchParams.get("username");

    try {
        const existingUsername = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

        return NextResponse.json(JSON.stringify({
            isTaken: existingUsername ? true : false
        }), {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(JSON.stringify({ message: "Internal server error" }), {
            status: 400
        })
    }
}
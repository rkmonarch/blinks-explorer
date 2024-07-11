import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { username, address } = await req.json();

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                address: address,
            },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User with this address already exists" }, {
                status: 400
            })
        }

        const user = await prisma.user.create({
            data: {
                username: username,
                address: address,
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

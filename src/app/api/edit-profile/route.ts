import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const { address, username, first_name, last_name, bio, avatar } = await req.json();

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                address: address,
            },
        });

        const existingUsername = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

        if (existingUser && !existingUsername) {
            const updatedUser = await prisma.user.update({
                where: {
                    address: address,
                },
                data: {
                    username: username,
                    address: address,
                    first_name: first_name,
                    last_name: last_name,
                    bio: bio,
                    avatar: avatar,
                },
            });
            return NextResponse.json(JSON.stringify(updatedUser), {
                status: 200
            })
        } else if (existingUsername) {
            return NextResponse.json(JSON.stringify({ message: "Username already taken" }), {
                status: 400
            })
        }
    } catch (error) {
        return NextResponse.json(JSON.stringify({ message: "Internal server error" }), {
            status: 400
        })
    }
}

import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(
    req: NextRequest,
) {
    const { address, blink, tags } = await req.json();
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                address: address,
            },
        });
        if (existingUser) {
            const blinkResponse = await prisma.blink.create({
                data: {
                    blink: blink,
                    Tags: {
                        create: tags.map((tag: string) => ({
                            tag: tag,
                        })),
                    },
                    User: {
                        connect: {
                            address: address,
                        },
                    },
                },
            });
            return NextResponse.json(JSON.stringify(blinkResponse), {
                status: 200
            })
        } else {
            return NextResponse.json(JSON.stringify({ message: "User with this address does not exist" }), {
                status: 400
            })
        }
    } catch (error) {
        return NextResponse.json(JSON.stringify({ message: "Internal server error" }), {
            status: 400
        })
    }
}

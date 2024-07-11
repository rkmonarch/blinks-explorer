import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const { tags } = await req.json();
    try {
        if (tags) {
            const blinks = await prisma.blink.findMany({
                include: {
                    User: true,
                    Tags: true,
                },
                where: {
                    Tags: {
                        some: {
                            tag: {
                                in: tags,
                            },
                        },
                    },
                },
            });
            return NextResponse.json(JSON.stringify(blinks), {
                status: 200
            })
        } else {
            const blinks = await prisma.blink.findMany({
                include: {
                    User: true,
                    Tags: true,
                },
            });
            return NextResponse.json(JSON.stringify(blinks), {
                status: 200
            })
        }
    } catch (error) {
        return NextResponse.json(JSON.stringify({ message: "Internal server error" }), {
            status: 400
        })
    }
}

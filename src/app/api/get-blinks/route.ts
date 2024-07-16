import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { tags } = await req.json();
    try {
        const blinks = await prisma.blink.findMany({
            include: {
                User: true,
                Tags: true,
            },
            where: tags ? {
                Tags: {
                    some: {
                        tag: {
                            in: tags,
                        },
                    },
                },
            } : {},
            orderBy: {
                rank: 'asc',  // Sorting by rank in ascending order
            },
        });

        return NextResponse.json(blinks, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, {
            status: 500
        });
    }
}

import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const { tags } = await req.json();
    try {
        let query: any = {
            include: {
                User: true,
                Tags: true,
            },
            orderBy: {
                rank: 'asc',  // Sorting by rank in ascending order
            },
        };

        if (tags) {
            query.where = {
                Tags: {
                    some: {
                        tag: {
                            in: tags,
                        },
                    },
                },
            };
        }

        const blinks = await prisma.blink.findMany(query);

        return NextResponse.json(blinks, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, {
            status: 500
        });
    }
}

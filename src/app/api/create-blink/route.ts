import { Tags, isValidURL } from "@/utils/constant";
import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { address, blink, tags } = await req.json();

    const invalidTags = tags.filter((tag: string) => !Tags.includes(tag));
    if (invalidTags.length > 0) {
        return NextResponse.json({ message: `Tags should be from the list: ${Tags.join(', ')}` }, {
            status: 400
        });
    }

    const invalidBlink = isValidURL(blink);

    if (!invalidBlink) {
        return NextResponse.json({ message: "Invalid URL" }, {
            status: 400
        });
    }

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

            return NextResponse.json(blinkResponse, {
                status: 200
            });
        } else {
            return NextResponse.json({ message: "User with this address does not exist" }, {
                status: 400
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, {
            status: 500
        });
    }
}

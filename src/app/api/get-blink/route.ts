import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          message: "id parameter is required",
        },
        {
          status: 400,
        }
      );
    }

    const blink = await prisma.blink.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
        Tags: true,
      },
    });

    if (!blink) {
      return NextResponse.json(
        {
          message: "Blink not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        data: blink,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching blink:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

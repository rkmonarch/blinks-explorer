import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { tags, page = 1, limit = 10 } = await req.json();
  const skip = (page - 1) * limit;
  const take = limit;

  try {
    let query: any = {
      include: {
        User: true,
        Tags: true,
      },
      orderBy: {
        rank: "asc", // Sorting by rank in ascending order
      },
      skip,
      take,
      where: {
        rank: {
          gt: 0, // Only include blinks with rank greater than 0
        },
      },
    };

    let countQuery: any = {
      where: {
        rank: {
          gt: 0, // Only count blinks with rank greater than 0
        },
      },
    };

    if (tags.length > 0) {
      query.where.Tags = {
        some: {
          tag: {
            in: tags,
          },
        },
      };
      countQuery.where.Tags = query.where.Tags;
    }

    const [blinks, totalCount] = await Promise.all([
      prisma.blink.findMany(query),
      prisma.blink.count(countQuery),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        data: blinks,
        totalPages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}

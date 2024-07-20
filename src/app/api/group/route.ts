import prisma from "@/utils/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { URL } from "url";

interface Blink {
  id: string;
  blink: string;
  address: string;
  createdAt: string;
  rank: number;
}

interface GroupedBlinks {
  [domain: string]: {
    group_name: string;
    website: string;
    blinks: Blink[];
  };
}

const specialCases: { [key: string]: string } = {
  "action.3.land": "3.land",
  "tensor.dialect.to": "tensor",
};

function extractGroupName(domain: string): string {
  if (specialCases[domain]) {
    return specialCases[domain];
  }
  const parts = domain.split('.');
  if (parts.length >= 3 && parts[0] === 'www') {
    return parts.slice(1, -1).join('.');
  }
  return parts.slice(-2, -1)[0];
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { group } = await req.json();
  try {
    let query: any = {
      include: {
        User: true,
        Tags: true,
      },
      orderBy: {
        rank: "asc",
      },
    };

    if (group) {
      query.where = {
       group: {
          equals: group,
        },
       }
    }

    const blinks = await prisma.blink.findMany(query);

    return NextResponse.json(blinks, {
      status: 200,
    });
 
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
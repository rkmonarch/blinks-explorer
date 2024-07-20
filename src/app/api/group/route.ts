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

    // Group blinks by domain
    const groupedBlinks = blinks.reduce((acc: any, blink: any) => {
      const url = new URL(blink.blink);
      const domain = url.hostname;
      const groupName = extractGroupName(domain);

      if (!acc[domain]) {
        acc[domain] = {
          group_name: groupName,
          website: domain,
          blinks: []
        };
      }
      acc[domain].blinks.push({
        id: blink.id,
        blink: blink.blink,
        address: blink.address,
        createdAt: blink.createdAt,
        rank: blink.rank,
      });
      return acc;
    }, {} as GroupedBlinks);

    // Create an array of group data
    const groupDataArray = Object.keys(groupedBlinks).map((domain) => ({
      group_name: groupedBlinks[domain].group_name,
      website: groupedBlinks[domain].website,
      blinks: groupedBlinks[domain].blinks,
    }));

    // Save group data to the Groups table
    await Promise.all(groupDataArray.map(async (group) => {
      await prisma.groups.create({
        data: {
          group_name: group.group_name,
          website: group.website,
          blinks: group.blinks,
        },
      });
    }));

    return NextResponse.json(groupDataArray, {
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
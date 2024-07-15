import { Tags, isValidURL } from "@/utils/constant";
import prisma from "@/utils/prisma-client";
import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest
} from "@solana/actions";
import { PublicKey } from "@solana/web3.js";
import { NextResponse } from "next/server";

export const GET = async () => {
  const payload: ActionGetResponse = {
    icon: "https://onlyblinks.com/og.jpg",
    description: 'Onlyblinks is a dedicated blinks explorer, enabling you to share your blinks directly from Twitter.',
    title: `Share your Blink`,
    label: "Share",
    links: {
      actions: [
        {
          href: "/api/actions/register?blink={blink}&tag={tag}",
          label: "Share",
          parameters: [
            {
              name: "blink",
              label: "Blink URL",
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  const url = new URL(req.url);
  const blink = url.searchParams.get("blink");
  const tag = url.searchParams.get("tag");
  let account: PublicKey;
  const body: ActionPostRequest = await req.json();

  try {
    account = new PublicKey(body.account);
  } catch (err) {
    return new Response("invalid account provided", {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  try {
    const invalidTags = tag?.split(",").filter((tag: string) => !Tags.includes(tag));
    if (invalidTags!.length > 0) {
      return NextResponse.json({ message: `Tags should be from the list: ${Tags.join(', ')}` }, {
        status: 400
      });
    }

    const invalidBlink = isValidURL(blink as string);

    if (!invalidBlink) {
      return NextResponse.json({ message: "Invalid URL" }, {
        status: 400
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        address: account.toBase58(),
      },
    });

    if (existingUser) {
      const blinkResponse = await prisma.blink.create({
        data: {
          rank: 1000,
          blink: blink as string,
          Tags: {
            create: tag?.split(",").map((tag: string) => ({
              tag: "",
            })),
          },
          User: {
            connect: {
              address: account.toBase58(),
            },
          },
        },
      });
    } else {
      const user = await prisma.user.create({
        data: {
          address: account.toBase58(),
          username: account.toBase58().trim().slice(0, 8),
        },
      });
      if (user) {
        const blinkResponse = await prisma.blink.create({
          data: {
            rank: 1000,
            blink: blink as string,
            Tags: {
              create: tag?.split(",").map((tag: string) => ({
                tag: "",
              })),
            },
            User: {
              connect: {
                address: account.toBase58(),
              },
            },
          },
        });
        return new Response(JSON.stringify({
          message: "Blink registered successfully!"
        }), {
          status: 200,
          headers: ACTIONS_CORS_HEADERS,
        });
      }
    }
    return new Response(JSON.stringify({
      message: "Blink registered successfully!"
    }), {
      status: 200,
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", {
      status: 500,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

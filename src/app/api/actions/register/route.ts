import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import {
  actionSpecOpenApiPostRequestBody,
  actionsSpecOpenApiPostResponse,
} from "@/utils/openapi";
import { PublicKey } from "@solana/web3.js";
import prisma from "@/utils/prisma-client";

export const GET = async () => {
  const payload: ActionGetResponse = {
    icon: "https://static.vecteezy.com/system/resources/previews/035/808/957/non_2x/3d-round-arrow-with-golden-coins-in-wallet-render-cashback-or-return-money-in-shopping-concept-of-payment-with-money-back-refund-and-digital-payment-return-of-investment-illustration-vector.jpg",
    description: `Register your blink for the Only Blinks`,
    title: `Register Blink`,
    label: "Register Blink",
    links: {
      actions: [
        {
          href: "/api/register?blink={blink}&tag={tag}",
          label: "Register Blink",
          parameters: [
            {
              name: "blink",
              label: "blink",
            },
            {
              name: "tag",
              label: "tag",
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

const app = new OpenAPIHono();

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
    const existingUser = await prisma.user.findFirst({
      where: {
        address: account.toBase58(),
      },
    });

    if (existingUser) {
      const blinkResponse = await prisma.blink.create({
        data: {
          blink: blink as string,
          Tags: {
            create: tag?.split(",").map((tag: string) => ({
              tag: tag,
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
          username: account.toBase58().trim().slice(0, 5),
        },
      });
      if (user) {
        const blinkResponse = await prisma.blink.create({
          data: {
            blink: blink as string,
            Tags: {
              create: tag?.split(",").map((tag: string) => ({
                tag: tag,
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
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

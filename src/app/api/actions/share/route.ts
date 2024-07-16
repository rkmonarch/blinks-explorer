import { ActionBlink } from "@/app/share/page";
import useBlink from "@/hooks/useBlink";
import { connection } from "@/utils/connection";
import { Tags, isValidURL } from "@/utils/constant";
import prisma from "@/utils/prisma-client";
import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { link } from "fs";
import { NextResponse } from "next/server";

export const GET = async () => {
  const payload: ActionGetResponse = {
    icon: "https://onlyblinks.com/og.jpg",
    description:
      "Onlyblinks is a dedicated blinks explorer, enabling you to share your blinks directly from Twitter.",
    title: `Share your Blink`,
    label: "Share",
    links: {
      actions: [
        {
          href: "/api/actions/share?blink={blink}&tag={tag}",
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
  const { fetchBlink } = useBlink();
  let account: PublicKey;
  const body: ActionPostRequest = await req.json();

  console.log("blink is", blink);

  async function updateActionsJson(blinkLink: string): Promise<string | null> {
    try {
      const url = new URL(blinkLink);
      const host = url.host;
      const actionsUrl = `https://www.${host}/actions.json`;
      const response = await fetch(actionsUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${actionsUrl}`);
      }

      const actionsResponse: ActionBlink = await response.json();

      for (const action of actionsResponse.rules) {
        const { pathPattern, apiPath } = action;

        if (pathPattern === "/") {
          return `https://www.${host}${apiPath}`;
        }
        const pathRegex = new RegExp(pathPattern.replace("/**", "(.*)"));
        const match = url.pathname.match(pathRegex);

        if (match) {
          const pathSuffix = match[1];
          const newApiPath = apiPath.replace("/**", `${pathSuffix}`);
          return newApiPath;
        }
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function alreadyExists(blinkURL: string) {
    try {
      const res = await prisma.blink.findFirst({
        where: {
          blink: blinkURL as string,
        },
      });
      if (res) {
        return true;
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  async function handleValidation() {
    try {
      const isValid = await fetchBlink(req.url);
      if (!isValid) {
        return false;
      }
      return true;
    } catch (error) {
      const actionsRespnse = await updateActionsJson(req.url);
      if (actionsRespnse) {
        const isValid = await fetchBlink(actionsRespnse);
        if (!isValid) {
          return false;
        }
        return true;
      }
    }
  }

  try {
    account = new PublicKey(body.account);
  } catch (err) {
    return new Response("invalid account provided", {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }

  try {
    // const invalidTags = tag?.split(",").filter((tag: string) => !Tags.includes(tag));
    // if (invalidTags!.length > 0) {
    //   return NextResponse.json({ message: `Tags should be from the list: ${Tags.join(', ')}` }, {
    //     status: 400
    //   });
    // }

    const isValidU = isValidURL(blink as string);
    if (!isValidU) {
      return NextResponse.json(
        { message: "Invalid Blink URL" },
        {
          status: 400,
        }
      );
    }

    const isValid = await handleValidation();

    if (isValid === false) {
      return NextResponse.json(
        { message: "Invalid Blink URL" },
        {
          status: 400,
        }
      );
    }
    const exists = await alreadyExists(blink as string);

    if (exists === true) {
      return NextResponse.json(
        { message: "Blink already exists" },
        {
          status: 400,
        }
      );
    }



    const existingUser = await prisma.user.findFirst({
      where: {
        address: account.toBase58(),
      },
    });

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(account),
        toPubkey: new PublicKey(account),
        lamports: 10000,
      })
    );

    transaction.feePayer = new PublicKey(account);
    const latestBlockhash = await connection.getLatestBlockhash();

    transaction!.recentBlockhash = latestBlockhash.blockhash;
    transaction!.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: "Blink registered successfully!",
      },
    });

    if (existingUser) {
      const blinkResponse = await prisma.blink.create({
        data: {
          rank: 1000,
          blink: blink as string,
          Tags: {
            create: [
              {
                tag: "Social",
              },
            ],
          },
          User: {
            connect: {
              address: account.toBase58(),
            },
          },
        },
      });
    } else {
      const username = `${account.toBase58().slice(0, 4)}...${account.toBase58().slice(-4)}`;

      const user = await prisma.user.create({
        data: {
          address: account.toBase58(),
          username: username,
          avatar: `https://source.boringavatars.com/beam/120/${account?.toBase58()}`,
        },
      });
      if (user) {
        const blinkResponse = await prisma.blink.create({
          data: {
            rank: 1000,
            blink: blink as string,
            Tags: {
              create: [
                {
                  tag: "Social",
                },
              ],
            },
            User: {
              connect: {
                address: account.toBase58(),
              },
            },
          },
        });

        return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
      }
    }
    return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", {
      status: 500,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

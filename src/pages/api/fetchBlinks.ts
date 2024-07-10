import prisma from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tags } = req.body;
  try {
    if (tags) {
      const blinks = await prisma.Blink.findMany({
        include: {
          User: true,
          Tags: true,
        },
        where: {
          Tags: {
            some: {
              tag: {
                in: tags,
              },
            },
          },
        },
      });
      res.status(200).json(blinks);
    } else {
      const blinks = await prisma.blink.findMany({
        include: {
          User: true,
          Tags: true,
        },
      });
      res.status(200).json(blinks);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

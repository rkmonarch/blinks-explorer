import prisma from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {address, blink, tags} = req.body;
  try {
    const existingUser = await prisma.User.findFirst({
        where: {
            address: address,
        },
        });
    if (existingUser) {
      const blinkResponse = await prisma.Blink.create({
        data: {
          blink: blink,
          Tags: {
            create: tags.map((tag:string) => ({
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
        res.status(200).json(blinkResponse);
    }else {
        return res.status(400).json({ message: "User with this address does not exist" });
    
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

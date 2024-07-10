import prisma from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, username, first_name, last_name, bio, avatar } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        address: address,
      },
    });

    const existingUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser && !existingUsername) {
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: {
          address: address,
        },
        data: {
          username: username,
          address: address,
          first_name: first_name,
          last_name: last_name,
          bio: bio,
          avatar: avatar,
        },
      });
      return res.status(200).json(updatedUser);
    } else if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

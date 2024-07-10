import prisma from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, address } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                address: address,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User with this address already exists" });
        }

        const user = await prisma.user.create({
            data: {
                username: username,
                address: address,
            },
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

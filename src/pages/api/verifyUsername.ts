import prisma from "@/utils/prisma-client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const {username} = req.body;
    try {
        const existingUsername = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

        if (existingUsername) {
            return res.status(400).json({ isTaken: true });
        }   
        else {
            return res.status(200).json({ isTaken: false });
        }     
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
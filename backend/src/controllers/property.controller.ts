import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error fetching properties" });
  }
};

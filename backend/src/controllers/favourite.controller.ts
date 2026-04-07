import { Response } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export const favouriteSchema = z.object({
  body: z.object({
    propertyId: z.string().uuid("Invalid property ID format"),
  }),
});

export const getFavourites = async (req: any, res: Response) => {
  try {
    const favourites = await prisma.favourite.findMany({
      where: { userId: req.user.id },
      include: { property: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(favourites.map((favourite: any) => favourite.property));
  } catch (error) {
    res.status(500).json({ message: "Server error fetching favourites" });
  }
};

export const addFavourite = async (req: any, res: Response) => {
  const { propertyId } = req.body;
  const userId = req.user.id;

  try {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const existing = await prisma.favourite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Property already in favourites" });
    }

    const favourite = await prisma.favourite.create({
      data: { userId, propertyId },
    });

    res.status(201).json({ message: "Added to favourites", favourite });
  } catch (error) {
    res.status(500).json({ message: "Server error adding favourite" });
  }
};

export const removeFavourite = async (req: any, res: Response) => {
  const { propertyId } = req.params;
  const userId = req.user.id;

  try {
    const favourite = await prisma.favourite.findUnique({
      where: { userId_propertyId: { userId, propertyId } },
    });

    if (!favourite) {
      return res
        .status(404)
        .json({ message: "Favourite not found or not owned by user" });
    }

    await prisma.favourite.delete({
      where: { userId_propertyId: { userId, propertyId } },
    });

    res.json({ message: "Removed from faourites" });
  } catch (error) {
    res.status(500).json({ message: "Server error removing favourite" });
  }
};

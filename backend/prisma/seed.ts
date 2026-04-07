import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  await prisma.favourite.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "John Doe",
      password: hashedPassword,
      role: "BUYER",
    },
  });

  const properties = [
    {
      title: "Modern Apartment in Downtown",
      description: "A beautiful 2-bedroom apartment with city views.",
      price: 450000,
      location: "New York, NY",
      imageUrl:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Cozy Suburban House",
      description: "Perfect family home with a large backyard.",
      price: 320000,
      location: "Austin, TX",
      imageUrl:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Luxury Villa with Pool",
      description: "Spacious villa with private swimming pool and garden.",
      price: 850000,
      location: "Miami, FL",
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Mountain Retreat Cabin",
      description: "Quiet cabin in the woods, perfect for weekend getaways.",
      price: 210000,
      location: "Aspen, CO",
      imageUrl:
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Beachfront Penthouse",
      description: "Exclusive penthouse with direct access to the beach.",
      price: 1200000,
      location: "Malibu, CA",
      imageUrl:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
    },
  ];

  for (const prop of properties) {
    await prisma.property.create({ data: prop });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

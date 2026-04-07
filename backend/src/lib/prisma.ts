import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});

// Use a shared instance to avoid multiple pool connections
export default prisma;

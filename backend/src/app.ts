import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import propertyRoutes from "./routes/property.routes";
import favouriteRoutes from "./routes/favourite.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/favourites", favouriteRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Buyer Portal API" });
});

export default app;

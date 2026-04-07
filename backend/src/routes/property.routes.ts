import { Router } from "express";
import * as propertyController from "../controllers/property.controller";

const router = Router();

router.get("/", propertyController.getAllProperties);

export default router;

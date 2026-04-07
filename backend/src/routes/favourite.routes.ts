import { Router } from "express";
import * as favouriteController from "../controllers/favourite.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";

const router = Router();

router.use(authenticate as any);

router.get("/", favouriteController.getFavourites);
router.post(
  "/",
  validate(favouriteController.favouriteSchema),
  favouriteController.addFavourite,
);
router.delete("/:propertyId", favouriteController.removeFavourite);

export default router;

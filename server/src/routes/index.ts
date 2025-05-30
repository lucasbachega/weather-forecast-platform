import { Router } from "express";
import authRoutes from "./auth.routes";
import placesRoutes from "./places.routes";
import weatherRoutes from "./weather.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/weather", weatherRoutes);
router.use("/places", placesRoutes);

export default router;

import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import authRoutes from "./auth.routes";
import placesRoutes from "./places.routes";
import weatherRoutes from "./weather.routes";

const router = Router();

router.use("/auth", verifyToken, authRoutes);
router.use("/weather", verifyToken, weatherRoutes);
router.use("/places", verifyToken, placesRoutes);

export default router;

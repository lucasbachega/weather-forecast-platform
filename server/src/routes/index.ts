import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import authRoutes from "./auth.routes";
import placesRoutes from "./places.routes";
import searchHistoryRoutes from "./searchHistory.routes";
import weatherRoutes from "./weather.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/weather", verifyToken, weatherRoutes);
router.use("/places", verifyToken, placesRoutes);
router.use("/history", verifyToken, searchHistoryRoutes);

export default router;

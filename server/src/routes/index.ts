import { Router } from "express";
import authRoutes from "./auth.routes";
import weatherRoutes from "./weather.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/weather", weatherRoutes);

export default router;

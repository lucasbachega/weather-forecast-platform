import { Router } from "express";
import { getUserProfile, login } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/login", login);
router.get("/me", verifyToken, getUserProfile);

export default router;

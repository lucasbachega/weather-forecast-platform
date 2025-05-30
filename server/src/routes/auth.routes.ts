import { Router } from "express";
import { getUserProfile, login, signup } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", verifyToken, getUserProfile);

export default router;

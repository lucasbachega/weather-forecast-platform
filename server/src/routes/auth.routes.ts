import { Router } from "express";
import { getUserProfile, login, logout } from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/signup", logout);
router.post("/login", login);
router.get('/me', verifyToken, getUserProfile);

export default router;

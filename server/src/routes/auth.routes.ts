import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", logout);
router.post("/login", login);

export default router;

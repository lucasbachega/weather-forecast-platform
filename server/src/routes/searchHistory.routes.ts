import { Request, Response, Router } from "express";
import { applyCache } from "../decorators/applyCache";
import { SearchHistory } from "../models/SearchHistory";

const router = Router();

router.get(
  "/search",
  applyCache(async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const history = await SearchHistory.find({ userId })
        .sort({ searchedAt: -1 })
        .limit(5);

      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar histórico" });
    }
  }, 5)
);

export default router;

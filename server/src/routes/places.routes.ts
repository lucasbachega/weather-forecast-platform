import { Router } from "express";
import { getCitySuggestions } from "../services/googlePlaces.service";

const router = Router();

router.get("/autocomplete", async (req, res) => {
  const { input } = req.query;

  if (!input || typeof input !== "string") {
    res.status(400).json({ message: "Parâmetro 'input' é obrigatório" });
    return;
  }

  try {
    const suggestions = await getCitySuggestions(input);
    res.json({ suggestions });
  } catch (err) {
    console.error("[Autocomplete error]", err);
    res.status(500).json({ message: "Erro ao buscar sugestões." });
  }
});

export default router;

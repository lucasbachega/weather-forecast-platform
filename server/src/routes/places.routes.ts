import { Router } from "express";
import {
  getCityByCoordinates,
  getCitySuggestions,
} from "../services/googlePlaces.service";

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

router.get("/from-coordinates", async (req, res) => {
  const lat = parseFloat(req.query.lat as string);
  const lng = parseFloat(req.query.lng as string);

  if (isNaN(lat) || isNaN(lng)) {
    res.status(400).json({ message: "Latitude e longitude inválidas." });
    return;
  }

  try {
    const city = await getCityByCoordinates(lat, lng);
    if (!city) {
      res.status(404).json({ message: "Cidade não encontrada." });
      return;
    }

    res.json({ city });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar cidade." });
  }
});

export default router;

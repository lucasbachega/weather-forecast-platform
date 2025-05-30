import { Router } from "express";
import {
  getForecastByCity,
  getWeatherByCity,
} from "../services/weather.service";
import { groupForecastByDay } from "../utils/forecastParser";

const router = Router();

router.get("/:city", async (req, res) => {
  try {
    const weather = await getWeatherByCity(req.params.city);
    res.json(weather);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar previsão" });
  }
});

router.get("/forecast/:city", async (req, res) => {
  try {
    const data = await getForecastByCity(req.params.city);
    const grouped = groupForecastByDay(data.list);
    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar previsão" });
  }
});

export default router;

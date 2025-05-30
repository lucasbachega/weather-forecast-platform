import { Request, Response, Router } from "express";
import { applyCache } from "../decorators/applyCache";
import { SearchHistory } from "../models/SearchHistory";
import {
  getForecastByCity,
  getWeatherByCity,
} from "../services/weather.service";
import { groupForecastByDay } from "../utils/forecastParser";

const router = Router();

router.get(
  "/city/:city",
  applyCache(async (req: Request, res: Response) => {
    try {
      const city = req.params.city;
      const userId = (req as any).userId;

      const weather = await getWeatherByCity(city);

      await SearchHistory.updateOne(
        {
          query: city,
          userId,
        },
        {
          $set: {
            searchedAt: new Date(),
          },
        },
        {
          upsert: true,
        }
      );

      res.json(weather);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar previsão" });
    }
  })
);

router.get(
  "/forecast/:city",
  applyCache(async (req: Request, res: Response) => {
    try {
      const data = await getForecastByCity(req.params.city);
      const grouped = groupForecastByDay(data.list);
      res.json(grouped);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar previsão" });
    }
  })
);

export default router;

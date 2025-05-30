import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city: string) {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) throw new Error("API_KEY ausente no .env");
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: {
      appid: API_KEY,
      q: city,
      units: "metric",
      lang: "pt_br",
    },
  });
  return res.data;
}

export async function getForecastByCity(city: string) {
  const API_KEY = process.env.WEATHER_API_KEY;
  if (!API_KEY) throw new Error("API_KEY ausente no .env");
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      appid: API_KEY, 
      q: city,
      units: "metric",
      lang: "pt_br",
    },
  });

  return res.data;
}

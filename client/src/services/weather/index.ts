import { formatCurrentWeatherData } from "../../utils/weather";
import api from "../api";

export async function getWeatherByCity(city: string) {
  const response = await api.get(`/weather/city/${city}`, {
    params: { city },
  });
  return formatCurrentWeatherData(response.data);
}

export async function getForecastByCity(city: string) {
  const response = await api.get(`/weather/forecast/${city}`);
  return response.data;
}

export async function getSearchHistory() {
  const response = await api.get(`/history/search`);
  return response.data;
}

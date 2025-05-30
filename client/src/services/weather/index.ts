import api from "../api";

export async function getWeatherByCity(city: string) {
  const response = await api.get(`/weather/${city}`, {
    params: { city },
  });
  return response.data;
}

export async function getForecastByCity(city: string) {
  const response = await api.get(`/weather/forecast/${city}`);
  return response.data;
}

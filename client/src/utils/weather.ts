import type { IBaseWeatherData, IWeatherData } from "../types/weather";

export function formatCurrentWeatherData(data: IBaseWeatherData): IWeatherData {
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    weatherDescription: data.weather[0].description,
    icon: data.weather[0].icon,
    windSpeed: data.wind.speed,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    date: new Date(data.dt * 1000).toISOString(),
  };
}

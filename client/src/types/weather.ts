export interface IBaseWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IWeatherData {
  city: string;
  country: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  weatherDescription: string;
  icon: string;
  windSpeed: number;
  sunrise: number;
  sunset: number;
  date: string;
  coord: {
    lon: number;
    lat: number;
  };
}

export interface ISearchHistory {
  userId: string;
  query: string;
  searchedAt: Date;
}

export function generateDailyMessage(data: IWeatherData): string {
  const {
    temperature,
    weatherDescription,
    windSpeed,
    humidity,
    tempMax,
    date,
    sunrise,
    sunset,
  } = data;

  const now = new Date(date);
  // const currentHour = now.getHours();

  const isDaytime =
    now.getTime() >= sunrise * 1000 && now.getTime() < sunset * 1000;

  // Regras baseadas no clima
  const messages: string[] = [];

  if (!isDaytime) {
    // Noite
    if (temperature < 18) {
      messages.push("Noite fria, ideal pra um filme com coberta 🍿🛋️");
    } else {
      messages.push("Boa noite! Aproveite o clima ameno 🌙");
    }
  } else {
    // Dia
    if (weatherDescription.includes("chuva")) {
      messages.push("Leve o guarda-chuva! ☔ Pode chover mais tarde.");
    } else if (weatherDescription.includes("nuvens")) {
      messages.push("Dia parcialmente nublado, mas agradável 🌤️");
    } else if (weatherDescription.includes("céu limpo") && tempMax > 28) {
      messages.push("Sol brilhando forte! Não esqueça o protetor! 😎");
    } else {
      messages.push("Dia tranquilo pela frente. Aproveite bem! ✨");
    }
  }

  // Complementos
  if (humidity > 80) {
    messages.push("Noite fresquinha e úmida... clima de abraço 🌙");
  }

  if (windSpeed > 8) {
    messages.push("Ventos fortes hoje! Pode bagunçar o cabelo 💨");
  }

  // Final
  return `${messages[0]}`;
}

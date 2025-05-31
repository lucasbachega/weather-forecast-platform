import { isSameDay, parseISO } from "date-fns";

// Função para formatar os dados de forecast para prox. dias
export function groupForecastByDay(forecastList: any[]) {
  const grouped: Record<string, any[]> = {};
  const today = new Date();

  for (const entry of forecastList) {
    const dateObj = parseISO(entry.dt_txt);

    if (isSameDay(dateObj, today)) continue; // Ignora entradas do mesmo dia de hoje

    const dateKey = entry.dt_txt.split(" ")[0]; // "2025-06-01"
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(entry);
  }

  return Object.entries(grouped).map(([date, entries]) => {
    const temps = entries.map((e) => e.main.temp);
    const descriptions = entries.map((e) => e.weather[0].description);
    const icons = entries.map((e) => e.weather[0].icon);

    return {
      date,
      temp_min: Math.min(...temps),
      temp_max: Math.max(...temps),
      description: mostCommon(descriptions),
      icon: mostCommon(icons),
    };
  });
}

function mostCommon(array: string[]) {
  const count: Record<string, number> = {};
  for (const item of array) {
    count[item] = (count[item] || 0) + 1;
  }

  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

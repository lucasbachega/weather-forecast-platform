import { format, isThisWeek, isThisYear, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string | number | Date): string {
  const d = typeof date === "number" ? new Date(date * 1000) : new Date(date);

  if (isToday(d)) {
    return format(d, "EEEE, HH:mm", { locale: ptBR }); // sexta-feira, 14:00
  }

  if (isThisWeek(d, { weekStartsOn: 1 })) {
    return format(d, "EEE, d", { locale: ptBR }); // qui, 23
  }

  if (isThisYear(d)) {
    return format(d, "d 'de' MMM", { locale: ptBR }); // 23 de jan.
  }

  return format(d, "d 'de' MMM 'de' yyyy", { locale: ptBR }); // 23 de jan. de 2024
}

export function formatWeekday(date: string | number | Date): string {
  const d = typeof date === "number" ? new Date(date * 1000) : new Date(date);
  const formatted = format(d, "EEE", { locale: ptBR }).toLowerCase();
  return formatted.slice(0, 3);
}

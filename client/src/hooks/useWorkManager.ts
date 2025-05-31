import { useEffect, useRef } from "react";
import { fetchWeatherData } from "../store/reducers/weatherSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const REFRESH_INTERVAL = 1 * 60 * 1000; // 1 minuto

export function useWorkManager() {
  const dispatch = useAppDispatch();
  const selectedQuery = useAppSelector((state) => state.weather.selectedQuery);
  const controllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!selectedQuery) return;

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    intervalRef.current = setInterval(() => {
      dispatch(
        fetchWeatherData({
          city: selectedQuery,
          background: true,
        })
      );
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalRef.current!);
      controllerRef.current?.abort();
    };
  }, [selectedQuery]);
}

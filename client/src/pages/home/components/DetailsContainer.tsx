import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useWorkManager } from "../../../hooks/useWorkManager";
import {
  fetchWeatherData,
  setSelectedQuery,
} from "../../../store/reducers/weatherSlice";
import { getUserCurrentCity } from "../../../utils/geolocation";
import DailyMessageAlert from "./DailyMessageAlert";
import ForecastDetails from "./forecast/ForecastDetails";
import ErrorInfo from "./layout/ErrorInfo";
import NoSelectedContent from "./layout/NoSelectedContent";
import WeatherDetails from "./weather/WeatherDetails";

const DetailsContainer = () => {
  //Trabalhador em background para atualizar os dados da pesquisa atual: a cada 1 min
  useWorkManager();

  const dispatch = useAppDispatch();
  const [params] = useSearchParams();

  const URLCity = params.get("city");

  const [loadingCurrentPosition, setLoadingCurrentPosition] = useState(false);

  const { error, loading, selectedQuery, weather, forecast } = useAppSelector(
    (state) => state.weather
  );

  const isLoading = loading || loadingCurrentPosition;
  const isReady = !isLoading && selectedQuery && weather;

  const detectUserCity = useCallback(async () => {
    setLoadingCurrentPosition(true);
    try {
      const city = await getUserCurrentCity();
      if (city) {
        dispatch(setSelectedQuery(city));
      }
    } finally {
      setLoadingCurrentPosition(false);
    }
  }, []);

  useEffect(() => {
    if (selectedQuery) {
      dispatch(fetchWeatherData({ city: selectedQuery }));
    } else if (!URLCity) {
      detectUserCity();
    }
  }, [selectedQuery]);

  if (error) return <ErrorInfo error={error} />;

  if (!weather && !selectedQuery && !isLoading) {
    return <NoSelectedContent />;
  }

  return (
    <Grid container spacing={2} mt={3} size={12}>
      <Grid size={{ xs: 12, md: 5 }}>
        <WeatherDetails loading={!isReady} data={weather} />
      </Grid>
      <Grid size={{ xs: 12, md: 7 }} container direction="column">
        <Grid size={12}>
          <DailyMessageAlert loading={!isReady} data={weather} />
        </Grid>
        <Grid size={12}>
          <ForecastDetails data={forecast} loading={!isReady} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsContainer;

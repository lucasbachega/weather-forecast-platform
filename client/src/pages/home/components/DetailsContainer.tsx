import { CircularProgress, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  fetchWeatherData,
  setSelectedQuery,
} from "../../../store/reducers/weatherSlice";
import { getUserCurrentCity } from "../../../utils/geolocation";
import DailyMessageAlert from "./DailyMessageAlert";
import ForecastDetails from "./forecast/ForecastDetails";
import ErrorInfo from "./layout/ErrorInfo";
import WeatherDetails from "./weather/WeatherDetails";

const DetailsContainer = () => {
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const [loadingCurrentPosition, setLoadingCurrentPosition] = useState(false);
  const { error, loading, selectedQuery, weather, forecast } = useAppSelector(
    (state) => state.weather
  );

  const isReadyToRender =
    !loading && !loadingCurrentPosition && !!selectedQuery && !!weather;

  const detectUserCity = async () => {
    setLoadingCurrentPosition(true);
    const city = await getUserCurrentCity();
    if (!selectedQuery && city) {
      dispatch(setSelectedQuery(city));
    }
    setLoadingCurrentPosition(false);
  };

  useEffect(() => {
    if (selectedQuery) {
      dispatch(fetchWeatherData(selectedQuery));
    } else {
      if (!params.get("city")) {
        detectUserCity();
      }
    }
  }, [selectedQuery]);

  if (!isReadyToRender) {
    return (
      <Stack
        width={"100%"}
        height={200}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress />
      </Stack>
    );
  }
  if (error) return <ErrorInfo error={error} />;

  if (!selectedQuery && !weather && !loading && !loadingCurrentPosition) {
    return null;
  }

  return (
    <Grid spacing={2} container size={12} mt={"30px"}>
      <Grid size={5}>{weather && <WeatherDetails data={weather} />}</Grid>
      <Grid size={7} container>
        <DailyMessageAlert data={weather} />
        <ForecastDetails data={forecast} />
      </Grid>
    </Grid>
  );
};

export default DetailsContainer;

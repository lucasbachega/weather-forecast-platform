import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LottieNoQuery from "../../../assets/lottie/no-query.json";
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
    !loading &&
    !loadingCurrentPosition &&
    Boolean(selectedQuery) &&
    Boolean(weather);

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

  if (!weather && !selectedQuery && !loadingCurrentPosition && !loading) {
    return (
      <Stack
        width={"100%"}
        minHeight={300}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Lottie
          animationData={LottieNoQuery}
          autoPlay
          loop
          style={{ height: "300px" }}
        />
        <Typography
          gutterBottom
          textAlign={"center"}
          fontWeight={600}
          variant="h4"
          maxWidth={400}
        >
          Como está o tempo aí?
        </Typography>
        <Typography
          textAlign={"center"}
          maxWidth={370}
          variant="body1"
          color="textSecondary"
        >
          Ative sua localização para ver a previsão do tempo da sua região em
          tempo real
        </Typography>
      </Stack>
    );
  }

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
        {weather && <DailyMessageAlert data={weather} />}
        <ForecastDetails data={forecast} />
      </Grid>
    </Grid>
  );
};

export default DetailsContainer;

import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchWeatherData } from "../../../store/reducers/weatherSlice";
import ErrorInfo from "./layout/ErrorInfo";
import WeatherDetails from "./weather/WeatherDetails";

const DetailsContainer = () => {
  const dispatch = useAppDispatch();
  const { error, loading, selectedQuery, weather } = useAppSelector(
    (state) => state.weather
  );

  useEffect(() => {
    if (selectedQuery) {
      dispatch(fetchWeatherData(selectedQuery));
    }
  }, [selectedQuery]);

  if (loading)
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

  if (error) return <ErrorInfo error={error} />;
  if (!selectedQuery || !weather) return;

  return (
    <Grid spacing={2} container size={12} mt={"30px"}>
      <Grid size={5} spacing={2}>
        <WeatherDetails data={weather} />
      </Grid>
      <Grid spacing={2} size={7} container>
        <Grid size={12}>
          <Box border={1} p={3} height={300}></Box>
        </Grid>
        <Grid size={12}>
          <Box border={1} p={3} height={200}></Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsContainer;

import { Box, Divider, Stack, Typography } from "@mui/material";
import { memo } from "react";
import WeatherIcon from "../../../../components/icons/WeatherIcon";
import type { IWeatherData } from "../../../../types/weather";
import { formatDate } from "../../../../utils/date";
import ContentBox from "../layout/ContentBox";
import LabelItem from "../layout/LabelItem";
import LoadingStack from "./LoadingStack";

interface Props {
  data: IWeatherData | null;
  loading?: boolean;
}

const WeatherDetails = ({ data, loading }: Props) => {
  return (
    <ContentBox>
      {loading || !data ? (
        <LoadingStack />
      ) : (
        <>
          <Typography gutterBottom fontSize={".9rem"} color="textSecondary">
            Tempo agora em
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {data.city}
          </Typography>
          <Typography gutterBottom fontSize={"1rem"} color="textSecondary">
            {formatDate(data.date)}
          </Typography>
          <Stack gap={1} direction={"row"} alignItems={"flex-start"}>
            <Typography variant="h2" fontWeight={600} color="primary">
              {data.temperature}
            </Typography>
            <Typography
              mt={1}
              variant="body1"
              fontWeight={700}
              color="textSecondary"
            >
              °C
            </Typography>
            <Box flex={1} />
            <Stack pr={2} alignItems={"flex-end"}>
              <WeatherIcon width={80} iconCode={data.icon} />
            </Stack>
          </Stack>
          <Typography sx={{ textTransform: "capitalize" }}>
            {data.weatherDescription}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Min: {data.tempMin}°C | Máx: {data.tempMax}°C
          </Typography>
          <Divider sx={{ my: 2, mx: -2 }} />
          <Stack gap={0.3}>
            <LabelItem label={"Sensação"}>{data.feelsLike}°C</LabelItem>
            <LabelItem label={"Umidade"}>{data.humidity}%</LabelItem>
            <LabelItem label={"Vento"}>{data.windSpeed} km/h</LabelItem>
          </Stack>
        </>
      )}
    </ContentBox>
  );
};

export default memo(WeatherDetails);

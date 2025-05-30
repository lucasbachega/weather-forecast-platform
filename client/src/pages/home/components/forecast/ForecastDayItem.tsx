import { Stack, Typography } from "@mui/material";
import { memo } from "react";
import WeatherIcon from "../../../../components/icons/WeatherIcon";
import type { IForecastItem } from "../../../../types/forecast";
import { formatWeekday } from "../../../../utils/date";

const ForecastDayItem = ({ icon, temp_max, temp_min, date }: IForecastItem) => {
  return (
    <Stack flex={1} height={130} alignItems={"center"}>
      <Typography
        textAlign={"center"}
        gutterBottom
        fontWeight={500}
        color="textSecondary"
      >
        {formatWeekday(new Date(date))}
      </Typography>
      <Stack justifyContent={"center"} alignItems={"center"} height={70}>
        <WeatherIcon width={40} iconCode={icon} />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"flex-end"}
        gap={.5}
      >
        <Typography fontSize={".85rem"} fontWeight={600}>
          {Math.round(temp_max)}°
        </Typography>
        <Typography fontSize={".85rem"} color="textDisabled">
          {Math.round(temp_min)}°
        </Typography>
      </Stack>
    </Stack>
  );
};

export default memo(ForecastDayItem);

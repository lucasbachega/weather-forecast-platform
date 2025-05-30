import { Box } from "@mui/material";

interface WeatherIconProps {
  iconCode: string;
  alt?: string;
  width?: number;
  height?: number;
}

const WeatherIcon = ({
  iconCode,
  alt = "",
  width = 70,
  height = undefined,
}: WeatherIconProps) => {
  return (
    <Box
      component="img"
      src={`client/src/assets/weather-icons/${iconCode}.png`}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default WeatherIcon;

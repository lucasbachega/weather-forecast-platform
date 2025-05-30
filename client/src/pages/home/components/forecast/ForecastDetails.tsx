import { Stack, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import type { IForecastItem } from "../../../../types/forecast";
import ContentBox from "../layout/ContentBox";
import ForecastDayItem from "./ForecastDayItem";

interface Props {
  data: Array<IForecastItem>;
}

const ForecastDetails = ({ data }: Props) => {
  const renderDays = useCallback(
    (item: IForecastItem, key: number) => (
      <ForecastDayItem key={key.toString()} {...item} />
    ),
    []
  );

  return (
    <ContentBox>
      <Typography variant="h6" fontWeight={600}>
        Próximos dias
      </Typography>
      <Stack
        mt={2}
        direction={"row"}
        alignItems={"flex-start"}
        flexWrap={"wrap"}
      >
        {data?.map(renderDays)}
      </Stack>
    </ContentBox>
  );
};

export default memo(ForecastDetails);

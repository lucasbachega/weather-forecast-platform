import { Stack, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import type { IForecastItem } from "../../../../types/forecast";
import ContentBox from "../layout/ContentBox";
import ForecastDayItem from "./ForecastDayItem";
import LoadingStack from "./LoadingStack";

interface Props {
  data: Array<IForecastItem>;
  loading?: boolean;
}

const ForecastDetails = ({ data, loading }: Props) => {
  const renderDays = useCallback(
    (item: IForecastItem, key: number) => (
      <ForecastDayItem key={key.toString()} {...item} />
    ),
    []
  );

  return (
    <ContentBox>
      {loading ? (
        <LoadingStack />
      ) : (
        <>
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
        </>
      )}
    </ContentBox>
  );
};

export default memo(ForecastDetails);

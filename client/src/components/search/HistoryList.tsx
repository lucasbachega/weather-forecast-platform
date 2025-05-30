import { List, Skeleton, Stack, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import type { ISearchHistory } from "../../types/weather";
import SuggestionListItem from "./SuggestionListItem";

interface Props {
  history: Array<ISearchHistory>;
  onSelect: Function;
}

const HistoryList = ({ history = [], onSelect = () => {} }: Props) => {
  const loading = useAppSelector(
    (state) => state.weather.searchHistory.loading
  );

  const renderItems = useCallback(
    (item: ISearchHistory, idx: number) => {
      return (
        <SuggestionListItem
          isHistory
          key={`${item.query}-${idx.toString()}`}
          onClick={onSelect}
          description={item.query}
        />
      );
    },
    [onSelect]
  );

  if (!history.length && loading) {
    return (
      <Stack gap={2} px={2} pb={3}>
        <Skeleton height={27} variant="rounded" width={"60%"} />
        <Skeleton height={27} variant="rounded" width={"50%"} />
        <Skeleton height={27} variant="rounded" width={"60%"} />
        <Skeleton height={27} variant="rounded" width={"40%"} />
      </Stack>
    );
  }

  return (
    <List disablePadding>
      <Typography mx={2} mb={0.5} variant="body2" color="textSecondary">
        Recentes
      </Typography>
      {history.map(renderItems)}
    </List>
  );
};

export default memo(HistoryList);

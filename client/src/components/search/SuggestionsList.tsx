import { Box, List, Paper, Typography } from "@mui/material";
import { memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  fetchSearchHistory,
  selectSortedSearchHistory,
} from "../../store/reducers/weatherSlice";
import HistoryList from "./HistoryList";
import SuggestionListItem from "./SuggestionListItem";
import type { Suggestion } from "./types";

interface Props {
  suggestions: Array<Suggestion>;
  onSelect: Function;
}

const SuggestionsList = ({ suggestions = [], onSelect = () => {} }: Props) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectSortedSearchHistory);

  const noOptions = !history.length && !suggestions.length;

  const renderItems = useCallback(
    (item: Suggestion) => {
      return (
        <SuggestionListItem key={item.place_id} onClick={onSelect} {...item} />
      );
    },
    [onSelect]
  );

  useEffect(() => {
    if (!suggestions?.length) {
      dispatch(fetchSearchHistory());
    }
  }, []);

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTop: 1,
        borderColor: "divider",
        boxShadow: `0 5px 10px rgba(34, 105, 239, 0.3)`,
      }}
      bgcolor={"background.default"}
      position={"absolute"}
      top={50}
      maxHeight={300}
      overflow={"auto"}
      left={0}
      width={"100%"}
    >
      {noOptions && <Typography m={5}>Nada encontrado</Typography>}
      <List>{suggestions.map(renderItems)}</List>
      {!suggestions.length && (
        <HistoryList history={history} onSelect={onSelect} />
      )}
    </Box>
  );
};

export default memo(SuggestionsList);

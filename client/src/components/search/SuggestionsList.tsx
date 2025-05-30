import { Box, List, Paper } from "@mui/material";
import { useCallback } from "react";
import SuggestionListItem from "./SuggestionListItem";
import type { Suggestion } from "./types";

interface Props {
  suggestions: Array<Suggestion>;
  onSelect: Function;
}

const SuggestionsList = ({ suggestions = [], onSelect = () => {} }: Props) => {
  const renderItems = useCallback(
    (item: Suggestion) => {
      return (
        <SuggestionListItem key={item.place_id} onClick={onSelect} {...item} />
      );
    },
    [onSelect]
  );

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTop: 1,
        borderColor: "divider",
      }}
      bgcolor={"background.default"}
      position={"absolute"}
      top={50}
      maxHeight={300}
      overflow={"auto"}
      left={0}
      width={"100%"}
    >
      <List>{suggestions.map(renderItems)}</List>
    </Box>
  );
};

export default SuggestionsList;

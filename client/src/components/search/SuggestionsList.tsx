import { Box, List, Paper } from "@mui/material";
import { useCallback } from "react";
import SuggestionListItem from "./SuggestionListItem";
import type { Suggestion } from "./types";

interface Props {
  suggestions: Array<Suggestion>;
}

const SuggestionsList = ({ suggestions = [] }: Props) => {
  const renderItems = useCallback((item: Suggestion) => {
    return <SuggestionListItem key={item.place_id} {...item} />;
  }, []);

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
      height={300}
      left={0}
      width={"100%"}
    >
      <List>{suggestions.map(renderItems)}</List>
    </Box>
  );
};

export default SuggestionsList;

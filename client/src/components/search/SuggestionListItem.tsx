import { LocationOnOutlined } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { memo } from "react";
import type { Suggestion } from "./types";

const SuggestionListItem = ({ description }: Suggestion) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <LocationOnOutlined color="primary" />
      </ListItemIcon>
      <ListItemText primary={description} />
    </ListItemButton>
  );
};

export default memo(SuggestionListItem);

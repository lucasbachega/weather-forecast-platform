import { LocationOnOutlined } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { memo } from "react";
import type { Suggestion } from "./types";

type Props = {
  onClick: Function;
};

const SuggestionListItem = ({
  description,
  place_id,
  onClick = () => {},
}: Suggestion & Props) => {
  return (
    <ListItemButton
      onClick={() =>
        onClick({
          description,
          place_id,
        })
      }
    >
      <ListItemIcon>
        <LocationOnOutlined color="primary" />
      </ListItemIcon>
      <ListItemText primary={description} />
    </ListItemButton>
  );
};

export default memo(SuggestionListItem);

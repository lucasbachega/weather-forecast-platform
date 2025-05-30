import { AccessTime, LocationOnOutlined } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { memo } from "react";
import type { Suggestion } from "./types";

type Props = {
  onClick: Function;
  isHistory?: boolean;
};

const SuggestionListItem = ({
  description,
  place_id,
  onClick = () => {},
  isHistory = false,
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
        {isHistory ? (
          <AccessTime color="action" />
        ) : (
          <LocationOnOutlined color="primary" />
        )}
      </ListItemIcon>
      <ListItemText primary={description} />
    </ListItemButton>
  );
};

export default memo(SuggestionListItem);

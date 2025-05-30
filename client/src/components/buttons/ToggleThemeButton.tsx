import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/material";
import { memo } from "react";

const ToggleThemeButton = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
};

export default memo(ToggleThemeButton);

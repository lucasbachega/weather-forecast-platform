import { Air } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography
} from "@mui/material";
import { memo } from "react";
import ToggleThemeButton from "../buttons/ToggleThemeButton";
import UserInfo from "./UserInfo";

const Header = () => {
  return (
    <AppBar
      variant="outlined"
      color="transparent"
      position="static"
      sx={{ border: "none" }}
    >
      <Container maxWidth="md">
        <Toolbar sx={{ gap: 1 }}>
          <Air color="primary" />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              fontSize: "clamp(3rem, 2.354rem + 2.7562vw, 5rem)",
              textWrap: "balance",
              letterSpacing: "-0.025em",
              display: "block",
              background: (t) =>
                `linear-gradient(145deg, ${t.palette.primary.main} 5%, ${t.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0px 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            Weather App
          </Typography>
          <Box flex={1} />
          <ToggleThemeButton />
          <UserInfo />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default memo(Header);

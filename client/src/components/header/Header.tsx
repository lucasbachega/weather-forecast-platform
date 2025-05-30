import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { memo } from "react";
import ToggleThemeButton from "../buttons/ToggleThemeButton";
import Logo from "../Logo";
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
          <Logo />
          <Box flex={1} />
          <ToggleThemeButton />
          <UserInfo />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default memo(Header);

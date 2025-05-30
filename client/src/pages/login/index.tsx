import { Box, Container, Stack } from "@mui/material";
import Logo from "../../components/Logo";
import LoginForm from "./components/LoginForm";

export default () => {
  return (
    <Box>
      <Container sx={{ pt: "100px" }} maxWidth="xs">
        <Stack mb={2} alignItems={"center"}>
          <Logo />
        </Stack>
        <LoginForm />
      </Container>
    </Box>
  );
};

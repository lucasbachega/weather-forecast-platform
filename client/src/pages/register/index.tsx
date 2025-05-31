import { Box, Container, Stack } from "@mui/material";
import Logo from "../../components/Logo";
import RegisterForm from "./components/RegisterForm";

export default () => {
  return (
    <Box>
      <Container sx={{ pt: "100px", pb: "50px" }} maxWidth="xs">
        <Stack mb={2} alignItems={"center"}>
          <Logo />
        </Stack>
        <RegisterForm />
      </Container>
    </Box>
  );
};

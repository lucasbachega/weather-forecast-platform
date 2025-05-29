import { Box, Container, Typography } from "@mui/material";
import LoginForm from "./components/LoginForm";

export default () => {
  return (
    <Box>
      <Container sx={{ pt: "100px" }} maxWidth="xs">
        <Typography textAlign={"center"} variant="h4" fontWeight={600}>
          Fazer login
        </Typography>
        <Typography
          textAlign={"center"}
          variant="body1"
          color="textSecondary"
          fontWeight={500}
        >
          Insira seu e-mail e senha.
        </Typography>
        <LoginForm />
      </Container>
    </Box>
  );
};

import { Box, Container, Typography } from "@mui/material";

export default () => {
  return (
    <Box>
      <Container sx={{ pt: "100px" }} maxWidth="xs">
        <Typography textAlign={"center"} variant="h4" fontWeight={600}>
          Criar conta
        </Typography>
        <Typography
          textAlign={"center"}
          variant="body1"
          color="textSecondary"
          fontWeight={500}
        >
          Insira seus dados
        </Typography>
     
      </Container>
    </Box>
  );
};

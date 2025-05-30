import { Container, Grid, Typography } from "@mui/material";
import WeatherSearchBar from "../../components/search/WeatherSearchBar";

export default () => {
  return (
    <Container sx={{ pt: "40px", pb: "100px" }} maxWidth="md">
      <Typography mb={0.3} variant="h4" textAlign={"center"} fontWeight={700}>
        Olá, Admin.
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        textAlign={"center"}
        fontSize={"17px"}
        fontWeight={500}
      >
        Vamos ver se hoje dá praia ou cobertor?
      </Typography>
      <Grid mt={'25px'} width={'100%'} container>
        <Grid size={12} justifyItems={'center'}>
          <WeatherSearchBar />
        </Grid>
      </Grid>
    </Container>
  );
};

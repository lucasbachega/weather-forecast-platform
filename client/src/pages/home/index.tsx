import { Container, Grid, Typography } from "@mui/material";
import WeatherSearchBar from "../../components/search/WeatherSearchBar";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getFirstName } from "../../utils/formatters";
import DetailsContainer from "./components/DetailsContainer";

export default () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Container sx={{ pt: "20px", pb: "100px" }} maxWidth="md">
      <Typography mb={0.3} variant="h4" textAlign={"center"} fontWeight={700}>
        Olá, {getFirstName(user?.name || "")}.
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
      <Grid mt={"25px"} width={"100%"} container>
        <Grid size={12} justifyItems={"center"}>
          <WeatherSearchBar />
        </Grid>
        <DetailsContainer />
      </Grid>
    </Container>
  );
};

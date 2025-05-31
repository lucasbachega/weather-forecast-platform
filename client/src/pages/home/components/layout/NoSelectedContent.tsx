import { Stack, Typography } from "@mui/material";
import LottieNoQuery from "../../../../assets/lottie/no-query.json";
import Lottie from "lottie-react";
import { memo } from "react";

function NoSelectedContent() {
  return (
    <Stack
      width="100%"
      minHeight={300}
      alignItems="center"
      justifyContent="center"
    >
      <Lottie
        animationData={LottieNoQuery}
        autoPlay
        loop
        style={{ height: 300 }}
      />
      <Typography
        gutterBottom
        textAlign="center"
        fontWeight={600}
        variant="h4"
        maxWidth={400}
      >
        Como está o tempo aí?
      </Typography>
      <Typography
        textAlign="center"
        maxWidth={370}
        variant="body1"
        color="textSecondary"
      >
        Ative sua localização para ver a previsão do tempo da sua região em
        tempo real.
      </Typography>
    </Stack>
  );
}

export default memo(NoSelectedContent);

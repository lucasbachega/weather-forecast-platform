import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { memo } from "react";
import LottieNoQuery from "../../../../assets/lottie/no-query.json";

interface Props {
  error?: string;
}

const ErrorInfo = ({}: Props) => {
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
        Ops. Nada encontrado
      </Typography>
      <Typography
        textAlign="center"
        maxWidth={370}
        variant="body1"
        color="textSecondary"
      >
        Tente buscar por Rio de Janeiro — quem sabe rola uma prainha?
      </Typography>
    </Stack>
  );
};

export default memo(ErrorInfo);

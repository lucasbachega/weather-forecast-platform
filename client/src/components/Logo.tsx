import { Air } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
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
    </Stack>
  );
};

export default Logo;

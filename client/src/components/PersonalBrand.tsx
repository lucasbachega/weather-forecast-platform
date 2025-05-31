import { Avatar, Link, Stack, Typography } from "@mui/material";
import { memo } from "react";
import WavyDivider from "./WavyDivider";

const PersonalBrand = () => {
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack gap={1} alignItems={"center"}>
        <WavyDivider width={100} sx={{ mb: 2 }} />
        <Typography
          variant="body2"
          textAlign={"center"}
          color="textSecondary"
          fontWeight={500}
        >
          Desenvolvido com ❤️ por
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Avatar sx={{ width: 25, height: 25 }} src="/imgs/lucas.jpeg">
            L
          </Avatar>
          <Link
            href="https://www.linkedin.com/in/lucas-bachega-8467b0366/"
            fontWeight={600}
            target="_blank"
          >
            Lucas Bachega
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default memo(PersonalBrand);

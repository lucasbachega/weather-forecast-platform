import { Stack, Typography } from "@mui/material";
import { memo } from "react";

interface Props {
  error: string;
}

const ErrorInfo = ({ error = "" }: Props) => {
  return (
    <Stack
      width={"100%"}
      height={200}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography fontWeight={600} variant="h5" textAlign={"center"}>
        Error
      </Typography>
      <Typography color="textSecondary" textAlign={"center"}>
        {error}
      </Typography>
    </Stack>
  );
};

export default memo(ErrorInfo);

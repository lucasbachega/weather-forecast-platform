import { Box, Skeleton, Stack } from "@mui/material";
import { memo } from "react";

function LoadingStack() {
  return (
    <>
      <Skeleton variant="text" width={"40%"} height={30} />
      <Stack mt={2} flex={1} direction="row" spacing={2}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Stack flex={1} key={index} spacing={1} alignItems="center">
            <Skeleton variant="text" width={30} />
            <Skeleton variant="circular" width={40} height={40} />
            <Box display="flex" gap={0.5}>
              <Skeleton variant="text" width={20} />
              <Skeleton variant="text" width={20} />
            </Box>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

export default memo(LoadingStack);

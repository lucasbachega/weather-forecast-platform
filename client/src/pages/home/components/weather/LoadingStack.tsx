import { Box, Divider, Skeleton, Stack } from "@mui/material";
import { memo } from "react";

function LoadingStack() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" width={120} height={20} />
      <Skeleton variant="text" width={160} height={35} />
      <Skeleton variant="text" width={100} height={20} />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Skeleton variant="text" width={80} height={90} />
        <Skeleton variant="rounded" width={20} height={20} />
        <Box flex={1} />
        <Skeleton variant="circular" width={80} height={80} />
      </Stack>
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="80%" height={18} />
      <Divider sx={{ my: 3, mx: -2 }} />
      <Stack gap={1}>
        <Skeleton variant="text" width="50%" height={18} />
        <Skeleton variant="text" width="50%" height={18} />
        <Skeleton variant="text" width="50%" height={18} />
      </Stack>
      <Skeleton variant="rounded" width="100%" height={100} />
    </Stack>
  );
}

export default memo(LoadingStack);

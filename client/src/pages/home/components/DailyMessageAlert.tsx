import { CampaignOutlined } from "@mui/icons-material";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  generateDailyMessage,
  type IWeatherData,
} from "../../../types/weather";
import ContentBox from "./layout/ContentBox";

interface Props {
  data: IWeatherData | null;
  loading?: boolean;
}

const TYPING_DELAY = 10;

const DailyMessageAlert = ({ data, loading }: Props) => {
  const fullMessage = useMemo(
    () => (data ? generateDailyMessage(data) : ""),
    [data]
  );
  const [displayedMessage, setDisplayedMessage] = useState("");
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loading) {
      setDisplayedMessage("");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    setDisplayedMessage("");
    indexRef.current = 0;

    const typeNextChar = () => {
      const nextChar = fullMessage.charAt(indexRef.current);
      if (nextChar) {
        setDisplayedMessage((prev) => prev + nextChar);
        indexRef.current += 1;
        timeoutRef.current = setTimeout(typeNextChar, TYPING_DELAY);
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, TYPING_DELAY);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fullMessage, loading]);

  return (
    <ContentBox sx={{ boxShadow: `0 0px 10px rgba(34, 105, 239, 0.5)` }}>
      {loading || !data ? (
        <Stack>
          <Skeleton sx={{ mb: 1 }} variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={"60%"} />
          <Skeleton variant="text" width={"40%"} />
        </Stack>
      ) : (
        <>
          <CampaignOutlined color="primary" fontSize="large" />
          <Box mt={1}>
            <Typography
              fontSize={"1.1rem"}
              fontWeight={600}
              sx={{
                textWrap: "balance",
                letterSpacing: "-0.025em",
              }}
            >
              {displayedMessage}
            </Typography>
          </Box>
        </>
      )}
    </ContentBox>
  );
};

export default memo(DailyMessageAlert);

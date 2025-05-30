import { CampaignOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
    generateDailyMessage,
    type IWeatherData,
} from "../../../types/weather";
import ContentBox from "./layout/ContentBox";

interface Props {
  data: IWeatherData;
}

const TYPING_DELAY = 10;

const DailyMessageAlert = ({ data }: Props) => {
  const fullMessage = useMemo(() => generateDailyMessage(data), [data]);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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

    // Start typing
    timeoutRef.current = setTimeout(typeNextChar, TYPING_DELAY);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fullMessage]);

  return (
    <ContentBox sx={{ boxShadow: `0 0px 10px rgba(34, 105, 239, 0.5)` }}>
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
    </ContentBox>
  );
};

export default memo(DailyMessageAlert);

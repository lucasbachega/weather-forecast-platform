import { Paper } from "@mui/material";

const ContentBox = ({ children }: any) => {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 1.5,
        p: 2,
        boxShadow: `0 0px 3px  rgba(34, 105, 239, 0.2)`,
      }}
    >
      {children}
    </Paper>
  );
};

export default ContentBox;

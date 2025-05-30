import { Paper, type PaperProps } from "@mui/material";

const ContentBox = ({ children, ...rest }: PaperProps) => {
  return (
    <Paper
      elevation={1}
      {...rest}
      sx={{
        width: "100%",
        borderRadius: 1.5,
        p: 2,
        boxShadow: `0 0px 3px  rgba(34, 105, 239, 0.2)`,
        ...rest.sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default ContentBox;

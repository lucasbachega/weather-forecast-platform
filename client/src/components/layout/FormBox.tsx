import { LinearProgress, Paper, type PaperProps } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  loading?: boolean;
}

const FormBox = ({ children, loading, ...rest }: Props & PaperProps) => {
  return (
    <Paper
      component={"form"}
      {...rest}
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        p: 3,
        boxShadow: "0 0px 10px rgba(34, 105, 239, 0.2)",
        borderRadius: 2,
        ...rest?.sx,
      }}
    >
      {loading && (
        <LinearProgress
          sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        />
      )}
      {children}
    </Paper>
  );
};

export default FormBox;

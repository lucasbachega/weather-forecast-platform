import { Stack, Typography } from "@mui/material";

interface Props {
  label: string;
  children: any;
  width?: number;
}

const LabelItem = ({ children, label, width = 150 }: Props) => {
  return (
    <Stack direction={"row"} width={"100%"} alignItems={"center"}>
      <Typography color="textSecondary" width={width}>
        {label}
      </Typography>
      <Typography fontWeight={600}>{children}</Typography>
    </Stack>
  );
};

export default LabelItem;

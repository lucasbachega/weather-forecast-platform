import { Button, Stack, Typography, useColorScheme } from "@mui/material";

const Hello = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <div>
      <Typography variant="h3" fontWeight={600} textAlign={"center"} m={3}>
        Olá mundooo :) {mode}
      </Typography>
      <Stack p={3} justifyContent={"center"} alignItems={"center"}>
        <Button
          variant="contained"
          onClick={() => {
            setMode(mode === "dark" || mode === "system" ? "light" : "dark");
          }}
        >
          Alternar tema
        </Button>
      </Stack>
    </div>
  );
};

export default Hello;

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  useColorScheme,
} from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../../services/auth/loadUser";

interface Props {
  children: ReactNode;
}

const AppContainer = ({ children }: Props) => {
  const { setMode } = useColorScheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const loggedIn = await loadUser(dispatch);
      if (!loggedIn) {
        navigate("/login");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Box
      component={"main"}
      bgcolor={"backgroundPrimary.main"}
      height={"100%"}
      width={"100%"}
    >
      {loading ? (
        <Stack
          height={"80vh"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Button onClick={() => setMode("light")}>Tema claro</Button>
          <Button onClick={() => setMode("dark")}>Tema escuro</Button>
          {children}
        </>
      )}
    </Box>
  );
};

export default AppContainer;

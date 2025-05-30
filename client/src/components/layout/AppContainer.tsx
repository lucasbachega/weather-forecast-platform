import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { loadUser } from "../../services/auth/loadUser";
import Header from "../header/Header";

interface Props {
  children: ReactNode;
}

const AppContainer = ({ children }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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
          {isAuthenticated && <Header />}
          {children}
        </>
      )}
    </Box>
  );
};

export default AppContainer;

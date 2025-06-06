import { Box, CircularProgress, Stack, useColorScheme } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { loadUser } from "../../services/auth/loadUser";
import { resetSearchHistory } from "../../store/reducers/weatherSlice";
import Header from "../header/Header";
import PersonalBrand from "../PersonalBrand";

interface Props {
  children: ReactNode;
}

const AppContainer = ({ children }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useColorScheme();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    (async () => {
      const loggedIn = await loadUser(dispatch);
      if (!loggedIn) {
        dispatch(resetSearchHistory());
        navigate("/login");
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (mode === "light") {
      document.body.style.backgroundColor = "#f1f3fd";
    } else {
      document.body.style.backgroundColor = "#000";
    }
  }, [mode]);

  return (
    <Box
      component={"main"}
      bgcolor={"backgroundPrimary.main"}
      flex={1}
      width={"100%"}
      pb={"100px"}
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

      <PersonalBrand />
    </Box>
  );
};

export default AppContainer;

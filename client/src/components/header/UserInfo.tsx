import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../store/reducers/authSlice";
import { resetSearchHistory } from "../../store/reducers/weatherSlice";
import { getInitials } from "../../utils/formatters";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [menu, setMenu] = useState<null | Element>(null);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(resetSearchHistory());
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return;
  return (
    <>
      <Tooltip title="Meu perfil">
        <Avatar
          component={"div"}
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            setMenu(e.currentTarget)
          }
          sx={{
            bgcolor: "secondary.main",
            fontWeight: 700,
            width: 35,
            height: 35,
            cursor: "pointer",
            ml: 0.5,
            ":hover": {
              outline: (t) => `1px solid ${t.palette.primary.main}`,
            },
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
      </Tooltip>
      <Menu
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={() => setMenu(null)}
        transitionDuration={50}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 200,
            },
          },
        }}
      >
        <Box p={2}>
          <Typography>{user.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
        </Box>
        <Divider sx={{ mb: 1 }} />
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 2 }} color="error" fontSize="small" />
          Sair
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserInfo;

import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../store/reducers/authSlice";
import { getInitials } from "../../utils/formatters";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [menu, setMenu] = useState<null | Element>(null);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return;
  return (
    <>
      <Avatar
        component={"div"}
        onClick={(e: React.MouseEvent<HTMLElement>) => setMenu(e.currentTarget)}
        sx={{
          bgcolor: "secondary.main",
          fontWeight: 700,
          width: 35,
          height: 35,
          cursor: "pointer",
          boxShadow: 1,
          ml: 0.5,
        }}
      >
        {getInitials(user?.name)}
      </Avatar>
      <Menu
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={() => setMenu(null)}
        transitionDuration={100}
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
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </>
  );
};

export default UserInfo;

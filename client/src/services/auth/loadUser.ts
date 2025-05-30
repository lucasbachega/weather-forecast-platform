import type { AppDispatch } from "../../store";
import { loginSuccess, logout } from "../../store/reducers/authSlice";
import api from "../api";

export const loadUser = async (dispatch: AppDispatch) => {
  try {
    const res = await api.get("/auth/me");
    dispatch(loginSuccess(res.data)); // token já está salvo
    return true;
  } catch (err) {
    dispatch(logout());
    localStorage.removeItem("token");
    return false;
  }
};

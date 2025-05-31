import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../../components/inputs/PasswordInput";
import FormBox from "../../../components/layout/FormBox";
import api from "../../../services/api";
import { loginSuccess } from "../../../store/reducers/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      dispatch(loginSuccess(user));

      navigate("/");
    } catch (err: any) {
      setError(
        err.response.data.message || "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBox loading={loading} onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography textAlign={"center"} variant="h5" fontWeight={600}>
        Criar conta
      </Typography>
      <Typography
        mb={2}
        textAlign={"center"}
        variant="body1"
        color="textSecondary"
        fontWeight={500}
      >
        Informe seus dados
      </Typography>
      <TextField
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
        label="Nome"
        required
        disabled={loading}
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        type="email"
        fullWidth
        label="E-mail"
        required
        disabled={loading}
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        label="Senha"
        required
        disabled={loading}
      />

      {Boolean(error) && (
        <Alert
          severity="error"
          sx={{ my: 2, alignItems: "center", fontWeight: 600 }}
          action={
            <IconButton
              sx={{ mb: 0.5 }}
              size="small"
              onClick={() => setError(null)}
            >
              <Close />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}

      <Stack direction={"row"} gap={1} mt={2}>
        <Button
          onClick={() => navigate("/login")}
          disabled={loading}
          variant="text"
        >
          Fazer login
        </Button>
        <Box flex={1} />
        <Button disabled={loading} type="submit" variant="contained">
          Criar
        </Button>
      </Stack>
    </FormBox>
  );
};

export default RegisterForm;

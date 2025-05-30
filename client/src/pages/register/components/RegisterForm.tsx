import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../../components/inputs/PasswordInput";
import FormBox from "../../../components/layout/FormBox";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  };

  return (
    <FormBox loading={loading} onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
        <Box flex={1} />
        <Button disabled={loading} type="submit" variant="contained">
          Criar
        </Button>
      </Stack>
    </FormBox>
  );
};

export default RegisterForm;

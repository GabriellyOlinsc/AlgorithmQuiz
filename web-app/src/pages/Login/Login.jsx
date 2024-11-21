
import { useNavigate } from "react-router-dom";
import { Button, Typography, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    const success = await login(email, password);

    if (success) {
      const role = localStorage.getItem("userRole");
      navigate(role === "teacher" ? "/teacher" : "/student");
    } else {
      setError("Credenciais inválidas ou erro no servidor.");
    }
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" style={{ height: "100vh" }}>
      <Typography variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="E-mail"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleLogin}>
        Entrar
      </Button>
    </Stack>
  );
};

export default Login;
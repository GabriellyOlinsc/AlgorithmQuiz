import { useNavigate } from "react-router-dom";
import { Button, Typography, Stack, TextField } from "@mui/material";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTeacherRedirect = () => {
    // Simula o login como professor
    localStorage.setItem("userRole", "teacher");
    navigate("/teacher");
  };

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
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
      <Button variant="contained" onClick={() => setError("Funcionalidade em construção!")}>
        Entrar
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleTeacherRedirect}
      >
        Entrar como Professor
      </Button>
    </Stack>
  );
};

export default Login;

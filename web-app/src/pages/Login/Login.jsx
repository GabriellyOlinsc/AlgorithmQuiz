import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Stack, TextField, Grid, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { classes } from "./styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/auth";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Endereço de e-mail inválido")
    .required("E-mail é obrigatório"),
  password: Yup.string()
    .required("Senha é obrigatória"),
});

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    setErrorMessage("");
    setOpenSnackbar(false);

    const res = await login(values.email, values.password);
    if (res.success) {
      const role = localStorage.getItem("userRole");
      navigate(role === "TEACHER" ? "/teacher" : "/student");
    } else {
      var error = '';
      if (res.response.message === 'Network Error') {
        error = "Erro no servidor";
      } else if (res.response.response.data.message.includes('User not found')) {
        error = "Usuário não encontrado"
      } else if (res.response.response.data.message.includes('Senha incorreta')) {
        error = "Senha inválida"
      }

      setErrorMessage(error);
      setOpenSnackbar(true);
      setSubmitting(false);
    }

  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container sx={classes.container}>
      <Grid item xs={10} md={10} lg={8} sx={classes.card}>
        <Box sx={classes.leftBox}>
          <img
            src="/src/assets/logo.png"
            alt="Ilustração motivacional"
            style={classes.logoImage}
          />
          <Typography variant="h6" align="center" color="black">
            Aprendendo algoritmos de forma prática e divertida!
          </Typography>
        </Box>

        <Box sx={classes.rightBox}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <Stack spacing={2}>
                  <Field
                    as={TextField}
                    label="E-mail"
                    name="email"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="email" />}
                    error={touched.email && !!errors.email}
                  />
                  <Field
                    as={TextField}
                    label="Senha"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="password" />}
                    error={touched.password && !!errors.password}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    sx={classes.loginButton}
                    fullWidth
                  >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;


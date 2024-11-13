import { Box, Button, TextField } from "@mui/material";

const Login = () => {

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <TextField
                label="Email"
                variant="outlined"
                value={''}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Senha"
                type="password"
                variant="outlined"
                value={''}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary">
                Entrar
            </Button>
        </Box>
    );
};

export default Login;

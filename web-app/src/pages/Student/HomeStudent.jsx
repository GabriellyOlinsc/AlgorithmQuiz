import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Ícone de sair
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { classes } from "./style";

export default function HomeTeacher() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.sidebar}>
        <Box sx={classes.sidebarHeader}>
          <Typography variant="h6">
            {user ? user.name : "Usuário"}
          </Typography>
          <ExitToAppIcon
            onClick={handleLogout}
            sx={{
              cursor: "pointer",
              color: "black",
              ":hover": { color: "#d84315" },
            }}
          />
        </Box>

        <Stack spacing={2} sx={{ width: "80%", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={() => handleNavigate("/teacher/game")}
            sx={classes.sidebarButton}
          >
            Jogar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleNavigate("/teacher/ranking")}
            sx={classes.sidebarButton}
          >
            Ranking
          </Button>
        </Stack>
      </Box>

      <Box sx={classes.mainArea}>
        <Paper sx={classes.paper}>
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
}

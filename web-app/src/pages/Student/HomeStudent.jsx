import { Box, Button, Typography, Stack, Paper, Avatar, DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; 
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { classes } from "./style";
import { useEffect, useRef, useState } from "react";

export default function HomeTeacher() {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [pendingNavigationPath, setPendingNavigationPath] = useState(null);
  const [isInQuiz, setIsInQuiz] = useState(false);

  const { logout } = useAuth();
  const user = useRef()
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    user.current = userName
    setIsInQuiz(location.pathname === "/student/quiz");
  },[])

  const handleNavigate = (path) => {
    if (isInQuiz) {
      setShowExitConfirmation(true);
      setPendingNavigationPath(path);
    } else {
      navigate(path);
    }
  };

  const confirmExit = () => {
    setShowExitConfirmation(false);
    setIsInQuiz(false); 
    navigate(pendingNavigationPath);
  };

  const cancelExit = () => {
    setShowExitConfirmation(false);
    setPendingNavigationPath(null);
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.sidebar}>
        <Box sx={classes.sidebarHeader}>
          <ExitToAppIcon
            onClick={handleLogout}
            sx={{
              cursor: "pointer",
              color: "black",
              ":hover": { color: "#d84315" },
            }}
          />
        </Box>
        <Avatar
          src="src\assets\studentAvatar.png" 
          alt={user?.name || "Usuário"}
          sx={classes.avatar}
        />
        <Typography variant="h8" sx={{textAlign: 'center', marginBottom: 4}}>{ user ? user.current : "Usuário"}</Typography>
        
        <Stack spacing={2} sx={{ width: "80%", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={() => handleNavigate("/student/game")}
            sx={classes.sidebarButton}
          >
            Jogar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleNavigate("/student/ranking")}
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
      <Dialog
        open={showExitConfirmation}
        onClose={cancelExit}
        aria-labelledby="confirm-exit-title"
        aria-describedby="confirm-exit-description"
      >
        <DialogTitle id="confirm-exit-title">
          Confirmação de Saída
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-exit-description">
            Ao sair do quiz, você perderá todo o progresso atual. Deseja realmente sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelExit} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmExit} color="secondary" autoFocus>
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

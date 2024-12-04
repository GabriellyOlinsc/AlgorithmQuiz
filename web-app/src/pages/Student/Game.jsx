import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  Radio,
} from "@mui/material";
import api from "../../api";
import QuizGame from "./QuizGame"; // Importa o componente do jogo
import { useNavigate } from "react-router-dom";

export default function Game() {
  const [quizzes, setQuizzes] = useState([]); // Lista de quizzes disponíveis
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Quiz selecionado
  const [phasesId, setPhasesId] = useState(null);
  const [startGame, setStartGame] = useState(false); // Controle para iniciar o jogo
  const navigate = useNavigate()
  // Busca todos os quizzes ao carregar a tela
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get("/quizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data.data);
      } catch (err) {
        console.error("Erro ao buscar quizzes:", err);
      }
    };
    fetchQuizzes();
  }, []);

  // Manipula a seleção do quiz
  const handleSelectQuiz = (quizId) => {
    setSelectedQuiz(quizId);

  };

  const handleStartQuiz = () => {
    const quiz = quizzes.find((q) => q.id === selectedQuiz);
    const phases = quiz.phases.map((p) => p.id)
    
    localStorage.setItem("quizId", quiz.id)
    setPhasesId(phases)
    setStartGame(true);
    navigate("/student/quiz",  { state: { phasesIds: phases } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        width: '90%',
        padding: 2,
      }}
    >
      {startGame ? (
        // Renderiza o componente do jogo quando o estado `startGame` for verdadeiro
        <QuizGame phasesIds={phasesId} />
      ) : (
        // Tela de seleção de quizzes
        <>
          <Box>
            <Typography
              variant="h5"
              color="black"
              sx={{ textAlign: "center", marginBottom: 3 }}
            >
              Quizzes disponíveis
            </Typography>
            <Divider sx={{ m: 2 }} />

            <Stack spacing={2}>
              {quizzes.map((quiz) => (
                <Paper
                  key={quiz.id}
                  elevation={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 2,
                    borderRadius: "10px",
                  }}
                >
                  <Typography variant="h6">{quiz.title}</Typography>
                  <Radio
                    checked={selectedQuiz === quiz.id}
                    onChange={() => handleSelectQuiz(quiz.id)}
                    sx={{
                      "&.Mui-checked": {
                        color: "rgb(41, 184, 172)",
                      },
                    }}
                  />
                </Paper>
              ))}
            </Stack>
          </Box>

          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              onClick={handleStartQuiz}
              disabled={!selectedQuiz} // Botão desabilitado se nenhum quiz estiver selecionado
              sx={{
                width: "100%",
                maxWidth: "300px",
                margin: "0 auto",
                backgroundColor: "#ffab91",
              }}
            >
              Jogar Quiz
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

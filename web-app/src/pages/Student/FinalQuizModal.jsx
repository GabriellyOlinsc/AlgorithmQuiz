import { Box, Button, Container, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const QuizFinalModal = ({ open, handleClose }) => {
  const [quizResults, setQuizResults] = useState({
    correct: 0,
    wrong: 0,
    score: 0,
  });

  // Verifica se está na última fase e última questão
  useEffect(() => {
    let correctAnswers = 0;
    let wrongAnswers = 0;

    for (let i = 0; i < 5; i++) {
      const phases = JSON.parse(localStorage.getItem(`quiz-phase-${i + 1}`))
      if (phases) {
        Object.values(phases).forEach(p => {
          p === "incorrect" ? wrongAnswers++ : correctAnswers++;
        })
      }
    }
    const score = correctAnswers * 50;
    setQuizResults({
      correct: correctAnswers,
      score: score,
      wrong: wrongAnswers
    })

  }, [open]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-title"
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", textAlign: "center", color: "#29B8ACD4" }}
        >
          SCORE: {quizResults.score}
        </Typography>
        <Container sx={{ mt: 2, display: 'flex', flexDirection:'row', justifyContent:'space-around' }}>
          <Typography variant="h6" sx={{ color: "#70AB00" }}>
            Acertos: {quizResults.correct}
          </Typography>
          <Typography variant="h6" sx={{ color: "#f44336" }}>
            Erros: {quizResults.wrong}
          </Typography>
        </Container>
        <Button
          onClick={handleClose}
          variant="contained"
          color="success"
          sx={{
            mt: 4,
            fontWeight: "bold",
            backgroundColor: "#29B8ACD4",
            "&:hover": {
              backgroundColor: "#29B8A0",
            },
            borderRadius: "10px",
          }}
          fullWidth
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

// Estilos básicos do modal (pode ser ajustado com CSS)
const style = {
  position: 'absolute',
  top: '50%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',

};

export default QuizFinalModal;
QuizFinalModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

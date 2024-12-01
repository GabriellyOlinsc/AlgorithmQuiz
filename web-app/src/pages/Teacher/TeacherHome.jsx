import React, { useState } from "react";
import { Box, Typography, Button, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StudentModal from "./StudentModal";
import ActivityModal from "./ActivityModal";
import PhaseModal from "./PhaseModal";
import TrackModal from "./TrackModal";

const TeacherHome = () => {
  const [activeTab, setActiveTab] = useState("Atividades"); // Aba ativa
  const [gamesSection, setGamesSection] = useState(""); // Aba interna de "Jogos"
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Oliveira Santos", registration: "123456", email: "alice.oliveira@hotmail.com" },
    { id: 2, name: "Carlos Pereira", registration: "654321", email: "carlos.pereira@hotmail.com" },
  ]);
  const [activities, setActivities] = useState([
    {
      id: 1,
      question: "O que é uma variável em programação?",
      alternatives: [
        "Um espaço na memória para armazenar dados.",
        "Uma constante no programa.",
        "Um comando do sistema operacional.",
        "Uma estrutura de controle.",
        "Uma função pré-definida.",
      ],
      correctAnswer: 0,
      difficulty: "Iniciante",
    },
    {
      id: 2,
      question: "Qual é a saída do código print(3 > 2 and 5 < 10)?",
      alternatives: ["True", "False", "Erro", "Nenhuma saída", "None"],
      correctAnswer: 0,
      difficulty: "Iniciante",
    },
  ]);

  const [phases, setPhases] = useState([
    {
      id: 1,
      name: "Variáveis",
      questions: [
        "O que é uma variável em programação?",
        "O que acontece quando você tenta acessar o valor de uma variável que ainda não foi inicializada?",
        "Em muitas linguagens, qual tipo de dado seria mais apropriado para armazenar números decimais?",
        "Qual operador é usado para atribuir valor a uma variável?",
      ],
    },
    {
      id: 2,
      name: "Operadores Lógicos",
      questions: [
        "Qual é o resultado da expressão 3 > 2 and 5 < 10?",
        "Qual é a diferença entre && e || em programação?",
      ],
    },
  ]);

  const [tracks, setTracks] = useState([
    {
      id: 1,
      name: "Decode! - Variáveis, operadores e expressões",
      description: "Quiz sobre variáveis, operadores e expressões.",
      phases: [1, 2],
      difficulty: "Iniciante",
    },
  ]);

  const [quizzes] = useState([
    {
      id: 1,
      name: "Decode! - Variáveis, operadores e expressões",
      description: "Quiz sobre variáveis, operadores e expressões.",
    },
    {
      id: 2,
      name: "Mestre dos Loops - Estruturas de repetição",
      description: "Quiz sobre lógica de estruturas de repetição.",
    },
    {
      id: 3,
      name: "Condicionalmente Falando - Condicionais",
      description: "Quiz sobre estruturas condicionais.",
    },
    {
      id: 4,
      name: "A Arte da Recursão - Funções Recursivas",
      description: "Quiz sobre funções recursivas e suas aplicações.",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [phaseModalOpen, setPhaseModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleCreatePhase = (newPhase) => {
    setPhases((prev) => [...prev, { ...newPhase, id: prev.length + 1 }]);
  };

  const handleDeletePhase = (id) => {
    setPhases((prev) => prev.filter((phase) => phase.id !== id));
  };

  const handleCreateTrack = (newTrack) => {
    setTracks((prev) => [
      ...prev,
      { ...newTrack, id: prev.length + 1, phases: newTrack.selectedPhases },
    ]);
  };

  const handleDeleteTrack = (id) => {
    setTracks((prev) => prev.filter((track) => track.id !== id));
  };

  const renderStudents = () => (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#ffab91"
        padding="10px 20px"
        borderRadius="10px 10px 0 0"
        marginBottom="10px"
      >
        <Typography variant="h6" color="#ffffff" fontWeight="bold">
          Lista de Alunos
        </Typography>
        <Button
          variant="text"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpenModal("Cadastrar")}
          sx={{ color: "#ffffff", fontWeight: "bold", textTransform: "none" }}
        >
          Cadastrar Aluno
        </Button>
      </Box>
      <Box>
        {students.map((student) => (
          <Box
            key={student.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="10px 20px"
            bgcolor="#f5f5f5"
            borderBottom="1px solid #cccccc"
          >
            <Typography>{student.name}</Typography>
            <Box>
              <IconButton onClick={() => handleOpenModal("Visualizar", student)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => handleOpenModal("Editar", student)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  setStudents((prev) => prev.filter((s) => s.id !== student.id))
                }
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );

  const renderActivities = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#ffab91"
        padding="10px 20px"
        borderRadius="10px 10px 0 0"
        marginBottom="10px"
      >
        <Typography variant="h6" color="#ffffff" fontWeight="bold">
          Lista de Atividades
        </Typography>
        <Button
          variant="text"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => handleOpenModal("Cadastrar")}
          sx={{ color: "#ffffff", fontWeight: "bold", textTransform: "none" }}
        >
          Cadastrar Pergunta
        </Button>
      </Box>
      <Box>
        {activities.map((activity) => (
          <Box
            key={activity.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="10px 20px"
            bgcolor="#f5f5f5"
            borderBottom="1px solid #cccccc"
          >
            <Typography>{activity.question}</Typography>
            <Box>
              <IconButton
                onClick={() => handleOpenModal("Visualizar", activity)}
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => handleOpenModal("Editar", activity)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  setActivities((prev) =>
                    prev.filter((a) => a.id !== activity.id)
                  )
                }
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );

  const renderPhases = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        padding="10px"
        bgcolor="#ffccbc"
        borderRadius="10px"
      >
        <Typography variant="h6">Fases</Typography>
        <Button
          variant="contained"
          onClick={() => setPhaseModalOpen(true)}
          sx={{
            bgcolor: "#ffab91",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { bgcolor: "#ff8a65" },
          }}
        >
          Criar Fase
        </Button>
      </Box>
      {phases.map((phase) => (
        <Accordion key={phase.id} sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: "#ffab91", color: "#fff", fontWeight: "bold" }}
          >
            <Typography>{phase.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {phase.questions.map((question, index) => (
                <Typography key={index} sx={{ padding: "5px" }}>
                  {index + 1}. {question}
                </Typography>
              ))}
              <Box mt={2} display="flex" justifyContent="flex-end">
                <IconButton onClick={() => handleDeletePhase(phase.id)}>
                  <DeleteIcon sx={{ color: "#ff5722" }} />
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  const renderTracks = () => (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        padding="10px"
        bgcolor="#ffccbc"
        borderRadius="10px"
      >
        <Typography variant="h6">Trilhas</Typography>
        <Button
          variant="contained"
          onClick={() => setTrackModalOpen(true)}
          sx={{
            bgcolor: "#ffab91",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { bgcolor: "#ff8a65" },
          }}
        >
          Criar Trilha
        </Button>
      </Box>
      {tracks.map((track) => (
        <Accordion key={track.id} sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: "#ffab91", color: "#fff", fontWeight: "bold" }}
          >
            <Typography>{track.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{track.description}</Typography>
            <Box mt={2}>
              <Typography variant="body2" fontWeight="bold">
                Fases:
              </Typography>
              <ul>
                {track.phases.map((phaseId) => {
                  const phase = phases.find((p) => p.id === phaseId);
                  return <li key={phaseId}>{phase?.name}</li>;
                })}
              </ul>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <IconButton onClick={() => handleDeleteTrack(track.id)}>
                <DeleteIcon sx={{ color: "#ff5722" }} />
              </IconButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  const renderQuizzes = () => (
    <Box>
      {quizzes.map((quiz) => (
        <Box
          key={quiz.id}
          sx={{
            marginBottom: "10px",
            padding: "15px",
            bgcolor: "#ffa07a",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h6" color="#fff" fontWeight="bold">
            {quiz.name}
          </Typography>
          <Typography color="#fff">{quiz.description}</Typography>
        </Box>
      ))}
    </Box>
  );

  const renderGamesSection = () => {
    if (gamesSection === "Fases") return renderPhases();
    if (gamesSection === "Trilhas") return renderTracks();
    if (gamesSection === "Quizzes") return renderQuizzes();
    return (
      <Typography textAlign="center" color="#666">
        Selecione uma seção para explorar.
      </Typography>
    );
  };

  const renderGames = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" padding="10px">
        <Button
          variant="contained"
          onClick={() => setGamesSection("Fases")}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: gamesSection === "Fases" ? "#80cbc4" : "#e0f7fa",
            "&:hover": { bgcolor: "#4db6ac" },
          }}
        >
          Fases
        </Button>
        <Button
          variant="contained"
          onClick={() => setGamesSection("Trilhas")}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: gamesSection === "Trilhas" ? "#80cbc4" : "#e0f7fa",
            "&:hover": { bgcolor: "#4db6ac" },
          }}
        >
          Trilhas
        </Button>
        <Button
          variant="contained"
          onClick={() => setGamesSection("Quizzes")}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            bgcolor: gamesSection === "Quizzes" ? "#80cbc4" : "#e0f7fa",
            "&:hover": { bgcolor: "#4db6ac" },
          }}
        >
          Quizzes
        </Button>
      </Box>
      {renderGamesSection()}
    </Box>
  );

  const renderContent = () => {
    if (activeTab === "Alunos") return renderStudents();
    if (activeTab === "Atividades") return renderActivities();
    if (activeTab === "Jogos") return renderGames();
  };

  return (
    <Box display="flex" height="100vh" bgcolor="linear-gradient(to right, #b2dfdb, #80cbc4)">
      <Box
        width="20%"
        bgcolor="#ffab91"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="20px"
        borderRadius="15px 0 0 15px"
      >
        <Typography variant="h6" color="#fff" fontWeight="bold" marginBottom="20px">
          Prof. Fulaninho
        </Typography>
        {["Alunos", "Atividades", "Jogos", "Ranking"].map((tab) => (
          <Button
            key={tab}
            fullWidth
            variant="contained"
            sx={{
              marginBottom: "10px",
              textTransform: "none",
              bgcolor: activeTab === tab ? "#80cbc4" : "#f5f5f5",
              color: activeTab === tab ? "#fff" : "#000",
              "&:hover": { bgcolor: "#4db6ac" },
            }}
            onClick={() => {
              setActiveTab(tab);
              setGamesSection(""); // Reset de subseção ao trocar de aba
            }}
          >
            {tab}
          </Button>
        ))}
      </Box>
      <Box
        flexGrow={1}
        bgcolor="#fff"
        margin="20px"
        borderRadius="10px"
        boxShadow="0px 4px 6px rgba(0,0,0,0.1)"
        padding="20px"
      >
        {renderContent()}
      </Box>

      {/* Modais */}
      <PhaseModal
        open={phaseModalOpen}
        handleClose={() => setPhaseModalOpen(false)}
        questions={phases}
        handleCreatePhase={handleCreatePhase}
      />
      <TrackModal
        open={trackModalOpen}
        handleClose={() => setTrackModalOpen(false)}
        phases={phases}
        handleCreateTrack={handleCreateTrack}
      />
      {modalOpen && activeTab === "Alunos" && (
        <StudentModal
          open={modalOpen}
          handleClose={handleCloseModal}
          type={modalType}
          student={selectedItem}
          handleSave={(student) => setStudents((prev) => [...prev, student])}
        />
      )}
      {modalOpen && activeTab === "Atividades" && (
        <ActivityModal
          open={modalOpen}
          handleClose={handleCloseModal}
          type={modalType}
          activity={selectedItem}
          handleSave={(activity) =>
            setActivities((prev) => [...prev, activity])
          }
        />
      )}
    </Box>
  );
};

export default TeacherHome;

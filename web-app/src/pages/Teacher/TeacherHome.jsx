import { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Accordion, AccordionSummary, AccordionDetails, Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StudentModal from "./StudentModal";
import ActivityModal from "./ActivityModal";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PhaseModal from "./PhaseModal";
import TrackModal from "./TrackModal";
import api from "../../api";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const TeacherHome = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Atividades"); // Aba ativa
  const [gamesSection, setGamesSection] = useState(""); // Aba interna de "Jogos"
  const [students, setStudents] = useState([]);
  const [phases, setPhases] = useState([])
  const [tracks, setTracks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [render, setRender] = useState(false)

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (activeTab === 'Jogos') {
      loadPhases()
      loadQuiz()
      loadActivities()
    } else if (activeTab === 'Atividades') {
      loadActivities()
    }
  }, [activeTab])

  const handleLoadData = (tab) => {
    if (tab === "Alunos") {
      loadStudents()
    }
  }

  const loadStudents = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const users = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const loadStudents = users.data.data.filter((u) => u.role === 'STUDENT')
      setStudents(loadStudents)
    } catch (err) {
      console.log(err)
    }
  }

  const loadPhases = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await api.get("/phases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPhases(data.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const loadQuiz = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await api.get("/quizzes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTracks(data.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {loadQuiz()}, [render])

  const loadActivities = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await api.get("/questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActivities(data.data.data)
    } catch (err) {
      console.log(err)
    }
  }

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

  const handleCreatePhase = async (newPhase) => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(newPhase)
      const phase = {
        name: newPhase.name,
        level: 'BEGINNER',
        questionIds: newPhase.selectedQuestions
      }
      api.post("/phases", phase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      loadPhases();
    } catch (err) {
      console.log(err)
    }
  };

  const handleDeletePhase = (id) => {
    setPhases((prev) => prev.filter((phase) => phase.id !== id));
  };

  const createTrack = async (track) => {
    const token = localStorage.getItem("authToken");

    await api.post(`quizzes/manual`, track, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const handleCreateTrack = (newTrack) => {
    const level = newTrack.difficulty === 'Intermediário' ? "INTERMEDIATE" : newTrack.difficulty === "Iniciante" ? "BEGINNER" : "ADVANCED";
    console.log("Description", newTrack)
    try {
      const track = {
        name: newTrack.name,
        level,
        phasesIds: newTrack.selectedPhases,
        description: newTrack.description
      }
      createTrack(track);
      setRender((prev) => !prev)
      loadQuiz()
    } catch (err) {
      console.log(err)
    }
  };

  const handleDeleteTrack = (id) => {
    setTracks((prev) => prev.filter((track) => track.id !== id));
  };

  const handleAutomaticQuiz = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const track = {
        name: "Quiz Automático",
        level: "BEGINNER"
      }
      await api.post(`quizzes/automatic`, track, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      loadQuiz()
    } catch (err) {
      console.log("err", err)
    }
  }

  const handleDeleteUser = (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const usereleted = api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(usereleted)
      setStudents((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.log("err", err)
    }
  }

  const handleCreateUser = (student) => {
    try {
      const newStudent = { ...student, role: 'STUDENT' }
      const token = localStorage.getItem("authToken");
      api.post(`/users`, newStudent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents((prev) => [...prev, student])

    } catch (err) {
      console.log(err)
    }
  }
  const handleSaveActivity = async (activity) => {
    console.log(activity)
    try {
      const level = activity.level === 'Intermediário' ? "INTERMEDIATE" : activity.level === "Iniciante" ? "BEGINNER" : "ADVANCED";
    
      const newQuestion = {
        statement: activity.statement,  
        alternatives: activity.alternatives.map((alt, index) => ({
          statement: alt,
          correct: index === activity.correctAnswer
        })),
        level
      }
      const token = localStorage.getItem("authToken");
      api.post(`/questions`, newQuestion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActivities((prev) => [...prev, newQuestion])
      loadActivities();
    } catch (err) {
      console.log(err)
    }
  }

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
              <IconButton
                onClick={() => handleDeleteUser(student.id)}
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
      <Box
        sx={{
          maxHeight: "550px", // Ajuste conforme necessário
          overflowY: "auto", // Ativa a rolagem vertical
        }}
      >
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
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Chip
                label={activity.level === "BEGINNER" ? "Fácil" : activity.level === "ADVANCED" ? "Difícil" : "Intermediário"}
                size="small"
                sx={{ marginRight: "10px", width: '70px', color: '', backgroundColor: activity.level === "BEGINNER" ? "#93CD84" : activity.level === "ADVANCED" ? "#FE6263" : "#FFE271" }}
              />
              <Typography>{activity.statement}</Typography>
            </Box>
            <Box>
              <IconButton
                onClick={() => handleOpenModal("Visualizar", activity)}
              >
                <VisibilityIcon />
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
      <Box sx={{
        maxHeight: "500px", // Ajuste conforme necessário
        overflowY: "auto"
      }}>


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
                    {index + 1}. {question.statement}
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
        <Box >
          <Button
            variant="contained"
            onClick={handleAutomaticQuiz}
            sx={{
              bgcolor: "#ffab91",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              mx: 2,
              "&:hover": { bgcolor: "#ff8a65" },
            }}
          >
            Criar Trilha Automática
          </Button>
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
      </Box>
      {tracks.map((track) => (
        <Accordion key={track.id} sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: "#ffab91", color: "#fff", fontWeight: "bold" }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography>{track.title}</Typography>
              <Chip
                label={track.level === "BEGINNER" ? "Fácil" : track.level === "ADVANCED" ? "Difícil" : "Intermediário"}
                size="small"
                sx={{ marginRight: "10px", width: '70px', color: '', backgroundColor: track.level === "BEGINNER" ? "#93CD84" : track.level === "ADVANCED" ? "##F39F9F" : "#FFE271" }}
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">{track.description}</Typography>
            <Box mt={2}>
              <Typography variant="body2" fontWeight="bold">
                Fases:
              </Typography>
              <ul>
                {track.phases.map((p) => {
                  return <li key={p.id + track.id}>{p?.name}</li>;
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
      {tracks.map((quiz) => (
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
            {quiz.title}
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
        <Box sx={{ display: 'flex', width: '250px', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h6" color="#fff" fontWeight="bold" marginBottom="20px">
            Prof. Fulaninho
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
        {["Alunos", "Atividades", "Jogos"].map((tab) => (
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
              handleLoadData(tab)
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
        questions={activities}
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
          handleSave={(student) => handleCreateUser(student)}
        />
      )}
      {modalOpen && activeTab === "Atividades" && (
        <ActivityModal
          open={modalOpen}
          handleClose={handleCloseModal}
          type={modalType}
          activity={selectedItem}
          handleSave={(activity) => handleSaveActivity(activity)
            //setActivities((prev) => [...prev, activity])
          }
        />
      )}
    </Box>
  );
};

export default TeacherHome;

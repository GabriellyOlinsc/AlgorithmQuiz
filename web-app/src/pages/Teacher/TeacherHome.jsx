import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import StudentModal from "./StudentModal";
import ActivityModal from "./ActivityModal";

const TeacherHome = () => {
  const [activeTab, setActiveTab] = useState("Atividades"); // Estado para a aba ativa
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Oliveira Santos",
      registration: "123456",
      email: "alice.oliveira@hotmail.com",
    },
    {
      id: 2,
      name: "Carlos Pereira",
      registration: "654321",
      email: "carlos.pereira@hotmail.com",
    },
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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Abrir modal
  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Fechar modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // Salvar ou editar
  const handleSave = (formData) => {
    if (activeTab === "Alunos") {
      if (modalType === "Cadastrar") {
        setStudents((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
      } else if (modalType === "Editar") {
        setStudents((prev) =>
          prev.map((student) =>
            student.id === formData.id ? formData : student
          )
        );
      }
    } else if (activeTab === "Atividades") {
      if (modalType === "Cadastrar") {
        setActivities((prev) => [
          ...prev,
          { ...formData, id: prev.length + 1 },
        ]);
      } else if (modalType === "Editar") {
        setActivities((prev) =>
          prev.map((activity) =>
            activity.id === formData.id ? formData : activity
          )
        );
      }
    }
    handleCloseModal();
  };

  const renderContent = () => {
    if (activeTab === "Alunos") {
      return (
        <>
          {/* Cabeçalho */}
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
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Cadastrar Aluno
            </Button>
          </Box>

          {/* Lista de Alunos */}
          <Box>
            {students.map((student, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="10px 20px"
                borderBottom={
                  index < students.length - 1 ? "1px solid #cccccc" : "none"
                }
                bgcolor="#f5f5f5"
              >
                <Typography>{student.name}</Typography>
                <Box>
                  <IconButton
                    onClick={() => handleOpenModal("Visualizar", student)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenModal("Editar", student)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      setStudents((prev) =>
                        prev.filter((s) => s.id !== student.id)
                      )
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
    } else if (activeTab === "Atividades") {
      return (
        <>
          {/* Cabeçalho */}
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
              sx={{
                color: "#ffffff",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Cadastrar Pergunta
            </Button>
          </Box>

          {/* Lista de Atividades */}
          <Box>
            {activities.map((activity, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="10px 20px"
                borderBottom={
                  index < activities.length - 1 ? "1px solid #cccccc" : "none"
                }
                bgcolor="#f5f5f5"
              >
                <Typography>{activity.question}</Typography>
                <Box>
                  <IconButton
                    onClick={() => handleOpenModal("Visualizar", activity)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenModal("Editar", activity)}
                  >
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
        </>
      );
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="linear-gradient(to right, #b2dfdb, #80cbc4)">
      {/* Menu Lateral */}
      <Box
        width="20%"
        bgcolor="#ffab91"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="20px"
        borderRadius="15px 0 0 15px"
      >
        <Typography variant="h6" color="#000" fontWeight="bold" marginBottom="20px">
          Prof. Fulaninho
        </Typography>
        {["Alunos", "Atividades", "Jogos", "Ranking"].map((text) => (
          <Button
            key={text}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: activeTab === text ? "#80cbc4" : "#f5f5f5",
              color: "#000",
              marginBottom: "15px",
              padding: "10px 0",
              borderRadius: "12px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
            onClick={() => setActiveTab(text)}
          >
            {text}
          </Button>
        ))}
      </Box>

      {/* Painel Principal */}
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        bgcolor="#ffffff"
        margin="20px"
        borderRadius="10px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
        padding="20px"
      >
        {renderContent()}
      </Box>

      {/* Modal */}
      {modalOpen && activeTab === "Alunos" && (
        <StudentModal
          open={modalOpen}
          handleClose={handleCloseModal}
          type={modalType}
          student={selectedItem}
          handleSave={handleSave}
        />
      )}
      {modalOpen && activeTab === "Atividades" && (
        <ActivityModal
          open={modalOpen}
          handleClose={handleCloseModal}
          type={modalType}
          activity={selectedItem}
          handleSave={handleSave}
        />
      )}
    </Box>
  );
};

export default TeacherHome;

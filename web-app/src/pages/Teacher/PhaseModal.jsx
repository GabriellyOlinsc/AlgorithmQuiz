import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PhaseModal = ({ open, handleClose, questions, handleCreatePhase }) => {
  const [formData, setFormData] = useState({
    name: "",
    selectedQuestions: [],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleQuestion = (questionId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedQuestions.includes(questionId);
      const updatedQuestions = isSelected
        ? prev.selectedQuestions.filter((id) => id !== questionId)
        : [...prev.selectedQuestions, questionId];
      return { ...prev, selectedQuestions: updatedQuestions };
    });
  };

  const handleSubmit = () => {
    handleCreatePhase(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Criar Fase
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={2}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome da Fase"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Box>

        <Box mt={2}>
          <Typography variant="body1" fontWeight="bold" mb={1}>
            Selecione as Perguntas:
          </Typography>
          <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
            {questions.map((question) => (
              <FormControlLabel
                key={question.id}
                control={
                  <Checkbox
                    checked={formData.selectedQuestions.includes(question.id)}
                    onChange={() => toggleQuestion(question.id)}
                  />
                }
                label={question.question}
              />
            ))}
          </Box>
        </Box>

        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "#ffab91",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { bgcolor: "#ff8a65" },
            }}
          >
            Criar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PhaseModal;

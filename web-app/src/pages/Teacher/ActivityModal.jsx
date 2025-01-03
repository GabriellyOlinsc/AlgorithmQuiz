import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ActivityModal = ({ open, handleClose, type, activity, handleSave }) => {
  const [formData, setFormData] = useState(
    activity || {
      statement: "",
      alternatives: ["", "", "", "", ""],
      level: "Iniciante",
    }
  );

  const isReadOnly = type === "Visualizar"; // Definição de campo de leitura apenas

  const handleChange = (field, value) => {
    if (field.startsWith("alternative")) {
      const index = parseInt(field.split("_")[1], 10);
      setFormData((prev) => {
        const updatedAlternatives = [...prev.alternatives];
        updatedAlternatives[index] = value;
        return { ...prev, alternatives: updatedAlternatives };
      });
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    if (type !== "Visualizar") {
      handleSave(formData);
    }
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
          height: 'auto',
          maxHeight: '95%',
          bgcolor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: 24,
          p: 3,
          overflowY: 'auto',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {type === "Visualizar" ? "Visualizar Pergunta" : type === "Editar" ? "Editar Pergunta" : "Cadastrar Pergunta"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={1}>
          <TextField
            fullWidth
            margin="normal"
            label="Pergunta"
            value={formData.statement}
            onChange={(e) => handleChange("statement", e.target.value)}
            disabled={type === 'Visualizar'}
          />
          {formData.alternatives.map((alt, index) => (
            <TextField
              key={index}
              fullWidth
              margin="normal"
              label={`Alternativa ${index + 1}`}
              value={alt.statement}
              onChange={(e) =>
                handleChange(`alternative_${index}`, e.target.value)
              }
              InputProps={{ readOnly: isReadOnly }}
            />
          ))}
          {!isReadOnly && (
            <RadioGroup
              value={formData.correctAnswer}
              onChange={(e) =>
                handleChange("correctAnswer", parseInt(e.target.value, 10))
              }
            >
              {formData.alternatives.map((_, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={`Alternativa ${index + 1} correta`}
                />
              ))}
            </RadioGroup>
          )}
          <RadioGroup
            value={formData.level === 'BEGINNER' ? "Iniciante" : formData.level === 'INTERMEDIATE' ? "Intermediário" : formData.level === 'ADVANCED' ? 'Avançado' : formData.level}
            onChange={(e) => handleChange("level", e.target.value)}
            row
          >
            {["Iniciante", "Intermediário", "Avançado"].map((level) => (
              <FormControlLabel
                key={level}
                value={level}
                control={<Radio />}
                label={level}
                disabled={isReadOnly} // Apenas visualização
              />
            ))}
          </RadioGroup>
        </Box>

        {type !== 'Visualizar' && (
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={type === "Visualizar" ? handleClose : handleSubmit}
              sx={{
                bgcolor: type === "Visualizar" ? "#ff8a65" : "#ffab91",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { bgcolor: type === "Visualizar" ? "#ff7043" : "#ff8a65" },
              }}
            >
              {type === "Visualizar" ? "Fechar" : type === "Editar" ? "Salvar" : "Cadastrar"}
            </Button>

          </Box>)
        }
      </Box>
    </Modal>
  );
};

export default ActivityModal;

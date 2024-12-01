import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  IconButton,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TrackModal = ({ open, handleClose, phases, handleCreateTrack }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedPhases: [],
    difficulty: "Iniciante",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (phaseId) => {
    setFormData((prev) => {
      const selected = prev.selectedPhases.includes(phaseId)
        ? prev.selectedPhases.filter((id) => id !== phaseId)
        : [...prev.selectedPhases, phaseId];
      return { ...prev, selectedPhases: selected };
    });
  };

  const handleSubmit = () => {
    handleCreateTrack(formData);
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
          width: 400,
          bgcolor: "#f5f5f5",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Criar Trilha
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={2}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Descrição"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Typography variant="body1" mt={2} mb={1}>
            Selecionar Fases:
          </Typography>
          {phases.map((phase) => (
            <FormControlLabel
              key={phase.id}
              control={
                <Checkbox
                  checked={formData.selectedPhases.includes(phase.id)}
                  onChange={() => handleCheckboxChange(phase.id)}
                />
              }
              label={phase.name}
            />
          ))}

          <Typography variant="body1" mt={2} mb={1}>
            Nível de Dificuldade:
          </Typography>
          <RadioGroup
            row
            value={formData.difficulty}
            onChange={(e) => handleChange("difficulty", e.target.value)}
          >
            <FormControlLabel value="Iniciante" control={<Radio />} label="Iniciante" />
            <FormControlLabel value="Intermediário" control={<Radio />} label="Intermediário" />
            <FormControlLabel value="Avançado" control={<Radio />} label="Avançado" />
          </RadioGroup>
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

export default TrackModal;

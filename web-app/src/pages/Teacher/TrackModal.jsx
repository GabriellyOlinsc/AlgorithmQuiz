import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TrackModal = ({ open, handleClose, phases, handleCreateTrack }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedPhases: [],
    difficulty: "Iniciante",
  });
  const [errors, setErrors] = useState(false); // Rastreamento de erros

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors(false); // Remove o estado de erro ao alterar os valores
  };

  const validateForm = () => {
    const hasErrors =
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.selectedPhases.length !== 5;

    setErrors(hasErrors);
    return !hasErrors; // Retorna `true` se não houver erros
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleCreateTrack(formData);
      handleClose();
    }
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
          height: "auto",
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
          {/* Nome */}
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors && !formData.name.trim()}
          />

          {/* Descrição */}
          <TextField
            fullWidth
            margin="normal"
            label="Descrição"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={errors && !formData.description.trim()}
          />

          {/* Seleção de Fases */}
          <FormControl
            fullWidth
            margin="normal"
            error={errors && formData.selectedPhases.length !== 5}
          >
            <Typography variant="body1" mb={1}>
              Selecionar Fases:
            </Typography>
            <Select
              multiple
              value={formData.selectedPhases}
              onChange={(e) => handleChange("selectedPhases", e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={phases.find((p) => p.id === value)?.name || value} />
                  ))}
                </Box>
              )}
            >
              {phases.map((phase) => (
                <MenuItem key={phase.id} value={phase.id}>
                  {phase.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Nível de Dificuldade */}
          <Typography variant="body1" mt={2} mb={1}>
            Nível de Dificuldade:
          </Typography>
          <Select
            fullWidth
            value={formData.difficulty}
            onChange={(e) => handleChange("difficulty", e.target.value)}
          >
            <MenuItem value="Iniciante">Iniciante</MenuItem>
            <MenuItem value="Intermediário">Intermediário</MenuItem>
            <MenuItem value="Avançado">Avançado</MenuItem>
          </Select>
        </Box>

        {/* Mensagem de erro geral */}
        {errors && (
          <Typography
            variant="body2"
            color="error"
            textAlign="center"
            mt={2}
          >
            Preencha os campos obrigatórios.
          </Typography>
        )}

        <Box mt={3} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "#ffab91",
              color: "#fff",
              fontWeight: "bold",
              width: '100%',
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

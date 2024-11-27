import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StudentModal = ({ open, handleClose, type, student, handleSave }) => {
  const [formData, setFormData] = useState(
    student || { name: "", registration: "", email: "", password: "" }
  );

  const isReadOnly = type === "Visualizar";

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    handleSave(formData);
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
            {type} Aluno
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
            InputProps={{ readOnly: isReadOnly }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Matrícula"
            value={formData.registration}
            onChange={(e) => handleChange("registration", e.target.value)}
            InputProps={{ readOnly: isReadOnly }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="E-mail"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            InputProps={{ readOnly: isReadOnly }}
          />
          {!isReadOnly && (
            <TextField
              fullWidth
              margin="normal"
              label="Senha"
              type="password"
              value={formData.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          )}
        </Box>

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

        </Box>
      </Box>
    </Modal>
  );
};

export default StudentModal;

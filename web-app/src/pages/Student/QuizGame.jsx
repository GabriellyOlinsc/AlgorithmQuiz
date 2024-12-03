import { useEffect, useRef, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import QuizStepForm from "./QuizStepForm";
import api from "../../api";
import { useLocation } from "react-router-dom";

export default function QuizGame() {
    const location = useLocation();
    const phasesIds = useRef()
    const [phases, setPhases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhases = async () => {
            setLoading(true);
            setError(null);

            try {
                const quizPhases = location.state?.phasesIds || []; 
                phasesIds.current = quizPhases;
                const token = localStorage.getItem("authToken");

                const requests = quizPhases.map((id) =>
                    api.get(`/phases/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    
                );
                const responses = await Promise.all(requests);
                // Extrai os dados das respostas e atualiza o estado
                const fetchedPhases = responses.map((response) => response.data.data);
                setPhases(fetchedPhases);
            } catch (err) {
                console.error("Erro ao buscar fases:", err);
                setError("Erro ao carregar as fases. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchPhases();
    }, [location.state?.phasesIds, phasesIds]);

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Carregando fases...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (phases.length === 0) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Typography variant="h6">
                    Nenhuma fase encontrada para este quiz.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
                Responda às questões do quiz
            </Typography>

            {/* Componente de etapas do formulário */}
            <QuizStepForm  phases={phases} />
        </Box>
    );
}
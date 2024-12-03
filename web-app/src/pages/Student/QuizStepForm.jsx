import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Chip,
    LinearProgress,
} from "@mui/material";
import Confetti from "react-confetti";
import { Howl } from "howler";
import QuizFinalModal from "./FinalQuizModal";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const TIMER = 10;

export default function QuizStepForm({ phases }) {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const totalTime = useRef()
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(TIMER);
    const [isPaused, setIsPaused] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()

    const currentPhase = phases[currentPhaseIndex];
    const currentQuestion = currentPhase.questions[currentQuestionIndex];
    const progress = ((TIMER - timeRemaining) / TIMER) * 100;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (currentPhaseIndex === 0 && currentQuestionIndex === 0) {
            setStartTime(Date.now());
            console.log("Inicio do jogo")
        }
        setTimeRemaining(TIMER);

        const timer = setInterval(() => {
            if (!isPaused) {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        handleTimeout();
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isPaused, currentQuestionIndex, currentPhaseIndex]);


    useEffect(() => {
        if (currentPhaseIndex < phases.length - 1) {
            localStorage.setItem(`quiz-phase-${currentPhase.id}`, JSON.stringify(answeredQuestions));
        }
    }, [answeredQuestions])

    const handleAnswerChange = (questionId, alternativeId) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: alternativeId,
        }));
    };

    const handleTimeout = () => {
        playSound("incorrect");

        setAnsweredQuestions((prev) => ({
            ...prev,
            [currentQuestion.id]: "incorrect",
        }));

        setTimeout(() => {
            if (currentQuestionIndex < currentPhase.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setTimeRemaining(TIMER);
            } else if (currentPhaseIndex < phases.length - 1) {
                setCurrentPhaseIndex(currentPhaseIndex + 1);
                setAnsweredQuestions({});
                setCurrentQuestionIndex(0);
                setTimeRemaining(TIMER);
            }
            if (currentPhaseIndex === phases.length - 1 &&
                currentQuestionIndex === currentPhase.questions.length - 1) {
                setTimeRemaining(TIMER);
                setIsPaused(true)
            }

        }, 2000);
    };


    const playSound = (type) => {
        const sound = new Howl({
            src: [type === "correct" ? "../../../public/sounds/correct.mp3" : "../../../public/sounds/incorrect.mp3"],
        });
        sound.play();
    };

    const handleNextQuestion = () => {
        if (currentPhaseIndex === phases.length - 1 &&
            currentQuestionIndex === currentPhase.questions.length - 1) {
            setEndTime(Date.now());
            setOpenModal(true)
        } else {

            const questionId = currentQuestion.id;
            const userAnswer = answers[questionId];
            const isCorrect = userAnswer === currentQuestion.correctAlternative;

            setIsPaused(true)
            playSound(isCorrect ? "correct" : "incorrect");
            setTimeRemaining(TIMER);
            setAnsweredQuestions((prev) => ({
                ...prev,
                [questionId]: isCorrect ? "correct" : "incorrect",
            }));

            setTimeout(() => {

                if (currentQuestionIndex < currentPhase.questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setTimeRemaining(TIMER);
                } else if (currentPhaseIndex < phases.length - 1) {
                    setCurrentPhaseIndex(currentPhaseIndex + 1);
                    setAnsweredQuestions({});
                    setCurrentQuestionIndex(0);
                    setTimeRemaining(TIMER);
                }

                setIsPaused(false)

            }, 2000);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false)

        if (startTime && endTime) {
            const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
            totalTime.current = totalTimeInSeconds
        }
        
        let wrongAnswers = 0;
        let correctAnswers = 0;

        for (let i = 0; i < 5; i++) {
            const phases = JSON.parse(localStorage.getItem(`quiz-phase-${i + 1}`))
            if (phases) {
                Object.values(phases).forEach(p => {
                    p === "incorrect" ? wrongAnswers++ : correctAnswers++;
                })
            }
            localStorage.removeItem(`quiz-phase-${i + 1}`)
        }

        try {
            console.log("Total Time:", totalTime)
            const performance = {
                studentId: parseInt(localStorage.getItem("id")),
                quizId: parseInt(localStorage.getItem("quizId")),
                correctAnswer: correctAnswers,
                incorrectAnswer: wrongAnswers,
                timeSpent: totalTime.current
            }
            api.post("/performance", performance)
            navigate('/student')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Box
            sx={{
                border: "2px solid #ffc1a8",
                padding: 2,
                borderRadius: 2,
                backgroundColor: "#f2f2f2",

                width: 600,
                margin: "0 auto",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#ffc1a8",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "white",
                    marginBottom: 2,
                }}
            >
                <Typography variant="h6">{`${currentPhaseIndex + 1}º FASE ${progress}` }</Typography>
                <Typography>{formatTime(timeRemaining)}</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    marginBottom: 2,
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: progress < 50 ? "#70DC58" : progress < 70 ? "#FFA500" : "#FF4500",

                    },
                }}
            />
            {/* Progresso das Perguntas */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    marginBottom: 2,
                }}
            >
                {currentPhase.questions.map((question, index) => {
                    const isCurrent = index === currentQuestionIndex;
                    const questionStatus = answeredQuestions[question.id];

                    return (
                        <Chip
                            key={index}
                            label={index + 1}
                            sx={{
                                backgroundColor:
                                    questionStatus === "correct"
                                        ? "#70DC58"
                                        : questionStatus === "incorrect"
                                            ? "red"
                                            : "default",
                                color: questionStatus ? "white" : "black",
                            }}
                            color={isCurrent ? "info" : "default"}
                        />
                    );
                })}
            </Box>

            {/* Pergunta e Alternativas */}
            <Box>
                <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                    {currentQuestion.statement}
                </Typography>
                <RadioGroup
                    sx={{
                        "& .MuiRadio-root": {
                            color: "#4a4a4a",
                        },
                        "& .Mui-checked": {
                            color: "#333333",
                        },
                    }}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) =>
                        handleAnswerChange(currentQuestion.id, Number(e.target.value))
                    }
                >
                    {currentQuestion.alternatives.map((alternative) => (
                        <FormControlLabel
                            key={alternative.id}
                            value={alternative.id}
                            control={<Radio />}
                            label={alternative.statement}
                        />
                    ))}
                </RadioGroup>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <Button
                    variant="contained"
                    onClick={handleNextQuestion}
                    disabled={timeRemaining === 0 || (!(currentPhaseIndex === 4 && currentQuestionIndex === 3 && timeRemaining === TIMER) && !answers[currentQuestion.id])}
                    sx={{
                        backgroundColor: "#29B8ACD4"
                    }}
                >
                    {currentPhaseIndex === phases.length - 1 &&
                        currentQuestionIndex === currentPhase.questions.length - 1
                        ? "Finalizar"
                        : "Próxima"}
                </Button>


                <Box sx={{ marginTop: 2, textAlign: "center" }}>
                    {answeredQuestions[currentQuestion.id] === "correct" && (
                        <>
                            <Confetti numberOfPieces={200} width={window.innerWidth}
                                height={window.innerHeight}
                            />
                            <Typography sx={{ color: "#70DC58", fontWeight: "bold" }}>
                                🎉 Parabéns! Resposta correta!
                            </Typography>
                        </>
                    )}
                    {(answeredQuestions[currentQuestion.id] === "incorrect" && timeRemaining > 0) ? (
                        <Typography sx={{ color: "red", fontWeight: "bold" }}>
                            ❌ Ops! A resposta correta era a {currentQuestion.alternatives.findIndex((q) => q.correct) + 1}° opção
                        </Typography>
                    ) : timeRemaining === 0 && (
                        <Typography sx={{ color: "orange", fontWeight: "bold" }}>
                            ⏱️ Tempo esgotado!
                        </Typography>
                    )}
                </Box>
            </Box>

            <QuizFinalModal
                open={openModal}
                handleClose={handleCloseModal} />
        </Box>
    );
}

QuizStepForm.propTypes = {
    phases: PropTypes.arrayOf(PropTypes.object).isRequired,
};

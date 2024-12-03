import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import ProtectedRoute from "../components/ProtectedRoute";
import { Login, Game, HomeStudent, Ranking, Welcome, TeacherHome, QuizGame } from "../pages";


const RoutesApp = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Fragment>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" />} />
                        <Route path="/Login" element={<Login />} />
                        <Route
                            path="/teacher"
                            element={
                                <ProtectedRoute allowedRoles={["TEACHER"]}>
                                    <TeacherHome />
                                </ProtectedRoute>
                            }
                        >
                        </Route>
                        <Route
                            path="/student"
                            element={
                                <ProtectedRoute allowedRoles={["STUDENT"]}>
                                    <HomeStudent />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Welcome />} />
                            <Route path="game" element={<Game />} />
                            <Route path="quiz" element={<QuizGame />} />
                            <Route path="ranking" element={<Ranking />} />
                        </Route>
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default RoutesApp;
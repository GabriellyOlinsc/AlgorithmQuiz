import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import ProtectedRoute from "../components/ProtectedRoute";
import { Login, Game, HomeStudent, Ranking, Welcome } from "../pages";

const RoutesApp = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Fragment>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" />} />
                        <Route path="/Login" element={<Login />} />
                        {/* ROTA DE TEACHER DEVE SER ALTERADA */}
                        <Route
                            path="/teacher"
                            element={
                                <ProtectedRoute allowedRoles={["TEACHER"]}>
                                    <HomeStudent />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Welcome />} />
                            <Route path="game" element={<Game />} />
                            <Route path="ranking" element={<Ranking />} />
                        </Route>
                        <Route
                            path="/student"
                            element={
                                <ProtectedRoute allowedRoles={["STUDENT"]}>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default RoutesApp;

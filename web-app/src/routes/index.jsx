import { Fragment } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../context/auth"
import ProtectedRoute from "../components/ProtectedRoute"
import Login from "../pages/Login/Login"

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
                                <ProtectedRoute allowedRoles={["teacher"]}>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student"
                            element={
                                <ProtectedRoute allowedRoles={["student"]}>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default RoutesApp
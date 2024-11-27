import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login/Login";
import TeacherHome from "../pages/Teacher/TeacherHome"; 

const RoutesApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route path="/" element={<Navigate to="/teacher" />} />
            <Route path="/Login" element={<Login />} />
            <Route
              path="/teacher"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <h1>Student Dashboard (Em desenvolvimento)</h1>
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
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import TeacherHome from './pages/Teacher/TeacherHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher" element={<TeacherHome />} />
      </Routes>
    </Router>
  );
}

export default App;
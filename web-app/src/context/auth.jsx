import { createContext, useContext, useState, useEffect } from "react";
import { loginService, logoutService } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Armazena informações do usuário

  useEffect(() => {
    // Verifica se há token no localStorage
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      setUser({ role });
    }
  }, []);

  const login = async (email, password) => {
    const result = await loginService(email, password);

    if (result.success) {
      setUser({ role: result.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName");

    if (token && role && userName) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp > currentTime) {
          setUser(userName);
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userName")
        }
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName")
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const decoded = jwtDecode(response.data.token);
      console.log("decoded", decoded)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", decoded.role);
      localStorage.setItem("userName", decoded.username);
      localStorage.setItem("id", decoded.id)

      setUser(decoded);
      return { success: true, response };
    } catch (err) {
      return { success: false, response: err };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("id");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

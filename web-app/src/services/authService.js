import api from "../api";

export const loginService = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, role } = response.data; 

    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);

    return { success: true, role };
  } catch (error) {
    console.error("Erro no login:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Erro ao fazer login" };
  }
};

export const logoutService = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
};

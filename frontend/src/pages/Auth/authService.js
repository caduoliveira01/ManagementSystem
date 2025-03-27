import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signing`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao fazer login:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const signup = async (fullName, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      fullName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar:", error.response?.data || error.message);
    throw error;
  }
};

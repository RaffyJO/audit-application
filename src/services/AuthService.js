import { axiosInstance } from "../utils/axios";

// Function to login
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/users/login", { email, password });
    console.log("Login Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to register
export const register = async (email, password, name) => {
  try {
    const response = await axiosInstance.post("/users/register", { 
      email, 
      password, 
      name,
    });
    console.log("Register Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error.response ? error.response.data : error.message;
  }
};

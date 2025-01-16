import { useSelector } from "react-redux";
import { axiosInstance } from "../utils/axios";

export const getAuditsData = async () => {
  const state = useSelector((state) => state.user);
  const token = state.token;
  
  try {
    const response = await axiosInstance.get("/audits", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Audits Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching audit data:", error);
    throw error.response ? error.response.data : error.message;
  }
};

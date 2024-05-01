import axios from "axios";
import { BASE_API_URL } from "../../helpers/constants/Constants";

export const request = async (url, method, payload, formData, params) => {
  const token = sessionStorage.getItem("authToken");
  const api = BASE_API_URL;
  try {
    const res = await axios({
      url: `${api}${url}`,
      headers: {
        ...(formData && { "Content-Type": "multipart/form-data" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      method,
      data: payload,
      params,
    });
    return res.data;
  } catch (error) {
    const { href } = window.location;
    if (error?.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userID");
      if (!href.includes("/login") && !href.includes("/auth")) {
        document.location.href = "/dashboard";
      }
    }

    throw error;
  }
};

// EXAMPLE TO USE

export async function signUp(data, role) {
  return request(`/auth/${role}/create`, "POST", data);
}

export async function createAppointments(data) {
  return request("/api/coaches/appointments", "GET", null, null, data);
}
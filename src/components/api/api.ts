import axios from "axios";
import { BASE_API_URL } from "../../helpers/constants/Constants";

async function refreshToken() {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    console.log("Trying to refresh token with:", refreshToken);
    const response = await axios.post(`${BASE_API_URL}/api/v1/user/token/refresh/`, {
      refresh: refreshToken,
    });
    console.log("Response from token refresh:", response);
    const { access, refresh } = response.data;
    console.log("access token", access);
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
    return access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // window.location.href = "/login";
    return null;
  }
}

export const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  payload?: any,
  formData?: boolean,
  params?: any,
) => {
  const token = sessionStorage.getItem("accessToken");
  console.log(`Sending request to ${url} with token:`, token);
  try {
    const response = await axios({
      url: `${BASE_API_URL}${url}`,
      headers: {
        ...(formData ? { "Content-Type": "multipart/form-data" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method,
      data: payload,
      params,
    });
    console.log(`Response from ${url}:`, response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 && !error.retryFlag) {
      error.config.retryFlag = true; // Установка флага, чтобы избежать бесконечного цикла
      const newToken = await refreshToken();
      if (newToken) {
        sessionStorage.setItem("accessToken", newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        // return axios(error.config);
      }
    }
    console.error(`Error in request to ${url}:`, error);
    throw error;
  }
};

export const loginAdmin = async (data: any) => request("/api/v1/user/token/admin/", "POST", data);

export const loginPartner = async (data: any) => request("/api/v1/user/token/", "POST", data);

export const createPartner = async (data: any) => request("/api/v1/user/create_partner/", "POST", data);

export const fetchPartnerData = async () => request("/api/v1/user/partner_list", "GET");

export const fetchPartnerId = async (id: number) => request(`/api/v1/user/profiles_admin/${id}/`, "GET");

export const fetchMe = async () => request("/api/v1/user/", "GET");

export const fetchMeEdit = async (data: any) => request("/api/v1/user/", "PUT", data);

export const fetchUsersList = async () => request("/api/v1/user/client_list/", "GET");

export const partnerBlock = async (data: any) => request("/api/v1/user/block_user/", "POST", data);

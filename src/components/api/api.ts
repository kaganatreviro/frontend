import axios from "axios";
import { BASE_API_URL } from "../../helpers/constants/Constants";

async function refreshToken() {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    const response = await axios.post(`${BASE_API_URL}/api/v1/user/token/refresh/`, {
      refresh: refreshToken,
    });
    console.log("respose token new", response);
    const { access, refresh } = response.data;
    console.log("access token", access);
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh); // Перезаписываем refresh токен, если он возвращается новый

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
  let token = sessionStorage.getItem("accessToken");
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
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 && !error.retryFlag) {
      error.retryFlag = true; // Установка флага, чтобы избежать бесконечного цикла
      token = await refreshToken();
      if (token) {
        error.config.headers.Authorization = `Bearer ${token}`;
        return axios(error.config);
      }
    }
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

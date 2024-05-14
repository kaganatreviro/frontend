import axios from "axios";
import { BASE_API_URL } from "../../helpers/constants/Constants";

async function refreshToken() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  try {
    const response = await axios.post(`${BASE_API_URL}/api/v1/user/token/refresh/`, {
      refresh: refreshToken,
    });
    const { access, refresh } = response.data;
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
    return access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}

async function makeRequest(config: any) {
  try {
    const response = await axios(config);
    console.log(`Response from ${config.url}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error in request to ${config.url}:`, error);
    throw error;
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
  const config = {
    url: `${BASE_API_URL}${url}`,
    headers: {
      ...(formData ? { "Content-Type": "multipart/form-data" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    method,
    data: payload,
    params,
  };

  try {
    return await makeRequest(config);
  } catch (error: any) {
    if (error.response?.status === 401 && !error.retryFlag) {
      const newToken = await refreshToken();
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
        const result = await makeRequest(config);
        return result;
      }
    }
    throw error;
  }
};

export const loginAdmin = async (data: any) => request("/api/v1/user/token/admin/", "POST", data);

export const loginPartner = async (data: any) => request("/api/v1/user/token/", "POST", data);

export const createPartner = async (data: any) => request("/api/v1/user/create_partner/", "POST", data);

export const fetchPartnerData = async () => request("/api/v1/user/partner_list", "GET");

export const fetchEstablishments = async () => request("/api/v1/partner/establishment/list/", "GET");

export const fetchPartnerId = async (id: number) => request(`/api/v1/user/profiles_admin/${id}/`, "GET");

export const fetchMe = async () => request("/api/v1/user/", "GET");

export const fetchMeEdit = async (data: any) => request("/api/v1/user/", "PUT", data);

export const fetchUsersList = async () => request("/api/v1/user/client_list/", "GET");

export const partnerBlock = async (data: any) => request("/api/v1/user/block_user/", "POST", data);

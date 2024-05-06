// src/api/request.ts
import axios from "axios";
import { BASE_API_URL } from "../../helpers/constants/Constants";

export const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  payload?: any,
  formData?: boolean,
  params?: any,
) => {
  const token = sessionStorage.getItem("authToken");
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
    if (error.response?.status === 401) {
      // sessionStorage.removeItem("authToken");
      // sessionStorage.removeItem("userID");
      // window.location.href = window.location.href.includes("/login") ? "/login" : "/dashboard";
    }
    throw error;
  }
};

export const loginAdmin = async (data: any) => request("/api/v1/user/token/admin/", "POST", data);

export const loginPartner = async (data: any) => request("/api/v1/user/token/", "POST", data);

export const createPartner = async (data: any) => request("/api/v1/user/create_partner/", "POST", data);

export const fetchPartnerData = async () => request("/api/v1/user/partner_list", "GET");

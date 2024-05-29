import axios from "axios";
import { BASE_API_URL } from "../../helpers/constants/Constants";

export async function refreshToken() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  // console.log("api get refreshToken", refreshToken);
  try {
    const response = await axios.post(`${BASE_API_URL}/api/v1/user/auth/token/refresh/`, {
      refresh: refreshToken,
    });
    const { access, refresh } = response.data;
    // console.log("const { access, refresh } = response.data;", refresh);
    // console.log("response", response);
    sessionStorage.setItem("accessToken", access);
    sessionStorage.setItem("refreshToken", refresh);
    // if (response) {
    //   sessionStorage.setItem("accessToken", access);
    //   sessionStorage.setItem("refreshToken", refresh);
    // }
    return access;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}

async function makeRequest(config: any) {
  // console.log("api config", config);
  try {
    const response = await axios(config);
    // console.log(`Response from ${config.url}:`, response.data);
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
  formData?: boolean | null,
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
      console.log("newToken", newToken);
      if (newToken) {
        config.headers.Authorization = `Bearer ${newToken}`;
        const result = await makeRequest(config);
        return result;
      }
    }
    throw error;
  }
};

export const loginAdmin = async (data: any) => request("/api/v1/user/admin/auth/token/", "POST", data);

export const loginPartner = async (data: any) => request("/api/v1/user/auth/token/", "POST", data);

export const createPartner = async (data: any) => request("/api/v1/user/admin/partners/create/", "POST", data);

export const fetchPartnerData = async () => request("/api/v1/user/admin/partners/list/", "GET");

export const fetchPartnerId = async (id: number) => request(`/api/v1/user/admin/partners/${id}/`, "GET");

export const fetchMe = async () => request("/api/v1/user/users/profile/", "GET");

export const fetchMeEdit = async (data: any) => request("/api/v1/user/users/profile/", "PUT", data);

export const fetchUsersList = async () => request("/api/v1/user/admin/clients/list/", "GET");

export const partnerBlock = async (data: any) => request("/api/v1/user/admin/users/block/", "POST", data);

// Partner by admin
export const getEstablishmentsPartner = async (id: number) => request(`/api/v1/partner/${id}/establishments/`, "GET");
export const editEstablishmentPartner = async (id: number, data: any) => request(`/api/v1/user/admin/partners/${id}/`, "PUT", data);

// Order
export const fetchOrderData = async (id: number) => request(`/api/v1/order/orders/${id}/`, "GET");
export const getOrderById = async (id: number) => request(`/api/v1/order/${id}/partner-order-history/`, "GET");
export const getOrderStatisticsById = async (id: number, filter?: any) => request(`/api/v1/order/statistics/${id}/`, "GET", null, null, filter);
export const createOrderData = async (data: any) => request("/api/v1/order/partner-place-order/", "POST", data);

// admin categories
export const fetchCategories = async () => request("/api/v1/beverage/categories/", "GET");
export const createCategory = async (data: any) => request("/api/v1/beverage/categories/", "POST", data);
export const deleteCategory = async (id: number) => request(`/api/v1/beverage/categories/${id}/`, "DELETE");
export const updateCategory = async (id: number, data: any) => request(`/api/v1/beverage/categories/${id}/`, "PUT", data);

// Menu
export const fetchAllMenu = async () => request("/api/v1/beverage/beverages/", "GET");
export const fetchMenu = async (id: number) => request(`/api/v1/partner/menu/${id}/`, "GET");
export const addItemMenu = async (data: any) => request("/api/v1/beverage/beverages/", "POST", data);
export const fetchMenuId = async (id: number) => request(`/api/v1/beverage/beverages/${id}/`, "GET");
export const editMenuId = async (id: number, data: any) => request(`/api/v1/beverage/beverages/${id}/`, "PUT", data);
export const deleteMenuId = async (id: number) => request(`/api/v1/beverage/beverages/${id}/`, "DELETE");

// Establishment
export const fetchEstablishments = async () => request("/api/v1/partner/establishments/", "GET");
export const createEstablishment = async (data: any) => request("/api/v1/partner/establishments/", "POST", data);
export const updateEstablishment = async (id: number, data: any) => request(`/api/v1/partner/establishments/${id}/`, "PUT", data);
export const deleteEstablishment = async (id: number) => request(`/api/v1/partner/establishments/${id}/`, "DELETE");

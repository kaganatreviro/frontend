import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderData,
  createOrderData, getOrderById, getOrderStatisticsById,
} from "../../../components/api/api";
import { Order } from "./orderSlice";

interface Filter {
  order_date__gte?: string;
  order_date__lte?: string;
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (orderId: number, { rejectWithValue }) => {
    try {
      const response = await fetchOrderData(orderId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchHistoryById = createAsyncThunk(
  "orders/fetchHistoryById", // Обновлено
  async (orderId: number, { rejectWithValue }) => {
    try {
      const data = await getOrderById(orderId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchStatisticsById = createAsyncThunk(
  "orders/fetchStatisticsById",
  async ({ establishmentId, startDate, endDate }: { establishmentId: number, startDate?: string, endDate?: string }, { rejectWithValue }) => {
    try {
      const filter: Filter = {};
      if (startDate && endDate) {
        filter.order_date__gte = startDate;
        filter.order_date__lte = endDate;
      }
      const data = await getOrderStatisticsById(establishmentId, filter);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order: Omit<Order, "id">, { rejectWithValue }) => {
    try {
      const response = await createOrderData(order);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

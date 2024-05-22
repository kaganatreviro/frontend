import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrderData,
  createOrderData,
} from "../../../components/api/api";
import { Order } from "./orderSlice";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchOrderData();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// export const fetchOrderById = createAsyncThunk(
//   "orders/fetchOrderById",
//   async (orderId: number, { rejectWithValue }) => {
//     try {
//       const data = await fetchOrderByIdApi(orderId);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );
//
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
//
// export const updateOrder = createAsyncThunk(
//   "orders/updateOrder",
//   async (order: Order, { rejectWithValue }) => {
//     try {
//       const response = await updateOrderData(order.id, order);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );
//
// export const deleteOrder = createAsyncThunk(
//   "orders/deleteOrder",
//   async (orderId: number, { rejectWithValue }) => {
//     try {
//       const response = await deleteOrderData(orderId);
//       return orderId; // возвращаем ID удаленного заказа
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

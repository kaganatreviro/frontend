import { createSlice } from "@reduxjs/toolkit";
import { fetchHistoryById, fetchOrders, fetchStatisticsById } from "./orderActions";

export interface Order {
  id: number;
  order_date: string;
  establishment_name: string;
  beverage_name: string;
  client_details: string;
}

interface OrderCategoryStatistic {
  category: string;
  total_orders: number;
}

interface OrderStatistics {
  total_orders: number;
  orders_by_category: OrderCategoryStatistic[];
}

interface OrderState {
  orders: Order[];
  selectedOrderId: number | null;
  currentOrderDetails: Order | null;
  orderHistory: Order[];
  orderStatistics: OrderStatistics | null; // Обновлено
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrderId: null,
  currentOrderDetails: null,
  orderHistory: [],
  orderStatistics: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedOrderId(state, action) {
      state.selectedOrderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchHistoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoryById.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchHistoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStatisticsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatisticsById.fulfilled, (state, action) => {
        state.orderStatistics = action.payload; // Обновлено
        state.loading = false;
      })
      .addCase(fetchStatisticsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedOrderId } = orderSlice.actions;
export default orderSlice.reducer;

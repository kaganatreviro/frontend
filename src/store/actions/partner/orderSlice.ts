import { createSlice } from "@reduxjs/toolkit";
import { fetchHistoryById, fetchOrders } from "./orderActions";

export interface Order {
  id: number;
  order_date: string;
  establishment_name: string;
  beverage_name: string;
  client_details: string;
}

interface OrderState {
  orders: Order[];
  selectedOrderId: number | null;
  currentOrderDetails: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrderId: null,
  currentOrderDetails: null,
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
        state.currentOrderDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchHistoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // .addCase(createOrder.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(createOrder.fulfilled, (state, action) => {
    //   state.orders.push(action.payload);
    //   state.loading = false;
    // })
    // .addCase(createOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // })
    // .addCase(updateOrder.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(updateOrder.fulfilled, (state, action) => {
    //   const updatedOrder = action.payload;
    //   const index = state.orders.findIndex((order) => order.id === updatedOrder.id);
    //   if (index !== -1) {
    //     state.orders[index] = updatedOrder;
    //   }
    //   if (state.currentOrderDetails && state.currentOrderDetails.id === updatedOrder.id) {
    //     state.currentOrderDetails = updatedOrder;
    //   }
    //   state.loading = false;
    // })
    // .addCase(updateOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // })
    // .addCase(deleteOrder.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(deleteOrder.fulfilled, (state, action) => {
    //   const deletedOrderId = action.payload;
    //   state.orders = state.orders.filter((order) => order.id !== deletedOrderId);
    //   state.loading = false;
    // })
    // .addCase(deleteOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export const { setSelectedOrderId } = orderSlice.actions;
export default orderSlice.reducer;

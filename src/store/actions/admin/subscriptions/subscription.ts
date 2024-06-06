import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSubscriptions } from "../../../../components/api/api";

export interface Subscription {
  id: number;
  name: string;
  duration: string;
  price: string;
  description: string;
  free_trial_days: number;
}

interface SubscriptionState {
  subscriptions: Subscription[];
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  error: null,
  loading: false,
  status: "idle",
};

export const fetchSubscriptionsList = createAsyncThunk(
  "subscriptions/fetchSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchSubscriptions();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSubscriptionsList.fulfilled,
        (state, action: PayloadAction<Subscription[]>) => {
          state.status = "succeeded";
          state.subscriptions = action.payload;
        },
      )
      .addCase(fetchSubscriptionsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default subscriptionsSlice.reducer;

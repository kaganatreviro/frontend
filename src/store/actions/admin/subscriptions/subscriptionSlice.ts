import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSubscriptionsList, fetchSubStatistics } from "./subscriptionActions";

export interface Subscription {
  id: number;
  name: string;
  duration: string;
  price: string;
  description: string;
  free_trial_days: number;
}

interface SubscriptionPlan {
  plan__name: string | null;
  count: number;
}

export interface SubscriptionStatistics {
  all_subscriptions: number;
  active_subscriptions: number;
  inactive_subscriptions: number;
  trial_subscriptions: number;
  total_price: number;
  most_popular_plans: SubscriptionPlan[];
}

interface SubscriptionState {
  subscriptions: Subscription[];
  statistics: SubscriptionStatistics | null;
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SubscriptionState = {
  subscriptions: [],
  statistics: null,
  loading: false,
  status: "idle",
  error: null,
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubscriptionsList.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
        state.status = "succeeded";
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptionsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchSubStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubStatistics.fulfilled, (state, action: PayloadAction<SubscriptionStatistics>) => {
        state.statistics = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default subscriptionsSlice.reducer;

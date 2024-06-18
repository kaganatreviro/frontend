import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubscriptions, fetchSubscriptionStatistics } from "../../../../components/api/api";
import { SubscriptionStatistics } from "./subscriptionSlice";

interface Filter {
  end_from?: string;
  end_to?: string;
  start_from?: string;
  start_to?: string;
}

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

export const fetchSubStatistics = createAsyncThunk(
  "subscriptions/fetchSubscriptionStatistics",
  async (filters: Filter, { rejectWithValue }) => {
    try {
      const data: SubscriptionStatistics = await fetchSubscriptionStatistics(filters);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

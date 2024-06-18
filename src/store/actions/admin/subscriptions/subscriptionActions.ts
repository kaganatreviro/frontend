import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubscriptions, fetchSubscriptionStatistics } from "../../../../components/api/api";
import { SubscriptionStatistics } from "./subscriptionSlice";

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
  async (_, { rejectWithValue }) => {
    try {
      const data: SubscriptionStatistics = await fetchSubscriptionStatistics();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

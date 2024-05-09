import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPartnerData, fetchPartnerId } from "../../../../components/api/api";

export const fetchPartner = createAsyncThunk(
  "partners/fetchPartner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPartnerData();
      console.log("API Response:", response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPartnerById = createAsyncThunk(
  "partners/fetchPartnerById",
  async (partnerId: number, { getState, rejectWithValue }) => {
    try {
      const data = await fetchPartnerId(partnerId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

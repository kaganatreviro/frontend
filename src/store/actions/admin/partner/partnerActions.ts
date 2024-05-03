import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPartnerData } from "../../../../components/api/api";

export const fetchPartner = createAsyncThunk(
  "partners/fetchPartner",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPartnerData();
      console.log("data?", data);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

import { createSlice } from "@reduxjs/toolkit";
import { fetchPartner } from "./partnerActions";
// import { PartnerData } from "../../../../components/api/types";

interface Partner {
  id: number;
  name: string;
  email: string;
  isBlocked: boolean;
  maxEstablishments: number;
}
interface PartnerState {
  partners: Partner[];
  loading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  partners: [],
  loading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartner.fulfilled, (state, action) => {
        // Предполагаем, что action.payload это массив данных о партнерах
        state.partners = action.payload;
        state.loading = false;
      })
      .addCase(fetchPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default partnerSlice.reducer;

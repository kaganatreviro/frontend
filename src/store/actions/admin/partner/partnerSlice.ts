import { createSlice } from "@reduxjs/toolkit";
import { fetchPartner } from "./partnerActions";
// import { PartnerData } from "../../../../components/api/types";

interface PartnerState {
  data: {
    name?: string;
    email?: string;
    maxEstablishments?: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  data: {
    name: "",
    email: "",
    maxEstablishments: 0,
  }, // Инициализировать поля name, email и maxEstablishments
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
        state.data = action.payload; // Теперь payload должен иметь тип PartnerData
        state.loading = false;
      })
      .addCase(fetchPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default partnerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchPartner, fetchPartnerById } from "./partnerActions";

interface Partner {
  id: number;
  name: string;
  email: string;
  isBlocked: boolean;
  maxEstablishments: number;
  phone_number: any | null;
}
interface PartnerState {
  partners: Partner[];
  selectedPartnerId: number | null;
  currentPartnerDetails: Partner | null;
  loading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  partners: [],
  selectedPartnerId: null,
  currentPartnerDetails: null,
  loading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setSelectedPartnerId(state, action) {
      state.selectedPartnerId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartner.fulfilled, (state, action) => {
        state.partners = action.payload;
        state.loading = false;
        console.log("Updated partners in state:", state.partners);
      })
      .addCase(fetchPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPartnerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartnerById.fulfilled, (state, action) => {
        state.currentPartnerDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchPartnerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPartnerId } = partnerSlice.actions;
export default partnerSlice.reducer;

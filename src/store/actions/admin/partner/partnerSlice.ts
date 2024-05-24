import { createSlice } from "@reduxjs/toolkit";
import { fetchPartner, fetchPartnerById, editPartnerById, fetchPartnerEstablishment } from "./partnerActions";

export interface Establishment {
  id: number;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  description: string;
  phone_number: string;
  logo: string;
  email: string;
  address: string;
  happyhours_start: string;
  happyhours_end: string;
  owner: number;
}

export interface Partner {
  id: number;
  name: string;
  email: string;
  is_blocked: boolean;
  max_establishments: number;
  phone_number: string | null;
}

interface PartnerState {
  partners: Partner[];
  selectedPartnerId: number | null;
  currentPartnerDetails: Partner | null;
  establishments: Establishment[];
  loading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  partners: [],
  selectedPartnerId: null,
  currentPartnerDetails: null,
  establishments: [],
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
      })
      .addCase(editPartnerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPartnerById.fulfilled, (state, action) => {
        const updatedPartner = action.payload;
        const index = state.partners.findIndex((partner) => partner.id === updatedPartner.id);
        if (index !== -1) {
          state.partners[index] = updatedPartner;
        }
        if (state.currentPartnerDetails && state.currentPartnerDetails.id === updatedPartner.id) {
          state.currentPartnerDetails = updatedPartner;
        }
        state.loading = false;
      })
      .addCase(editPartnerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPartnerEstablishment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartnerEstablishment.fulfilled, (state, action) => {
        state.establishments = action.payload;
        state.loading = false;
      })
      .addCase(fetchPartnerEstablishment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedPartnerId } = partnerSlice.actions;
export default partnerSlice.reducer;

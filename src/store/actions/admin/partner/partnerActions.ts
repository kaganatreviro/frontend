import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editEstablishmentPartner,
  fetchPartnerData,
  fetchPartnerId,
  getEstablishmentsPartner,
} from "../../../../components/api/api";
import { Partner } from "./partnerSlice";

export const fetchPartner = createAsyncThunk(
  "partners/fetchPartner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPartnerData();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPartnerEstablishment = createAsyncThunk(
  "partners/fetchPartnerEstablishment",
  async (partnerId: number, { rejectWithValue }) => {
    try {
      const response = await getEstablishmentsPartner(partnerId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchPartnerById = createAsyncThunk(
  "partners/fetchPartnerById",
  async (partnerId: number, { rejectWithValue }) => {
    try {
      const data = await fetchPartnerId(partnerId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const editPartnerById = createAsyncThunk(
  "partners/editPartnerById",
  async (partner: Partner, { rejectWithValue }) => {
    try {
      const response = await editEstablishmentPartner(partner.id, partner);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

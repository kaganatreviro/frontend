import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEstablishments } from "../../../components/api/api";

export interface Establishment {
  id: number;
  name: string;
  location: {
    type: "Point";
    coordinates: [12.9721, 77.5933];
  };
  description: "string";
  phone_number: "string";
  logo: "string";
  address: "string";
  happyhours_start: "string";
  happyhours_end: "string";
}

interface EstablishmentState {
  establishments: Establishment[];
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EstablishmentState = {
  establishments: [],
  error: null,
  loading: false,
  status: "idle",
};

export const fetchEstablishmentsList = createAsyncThunk(
  "establishments/fetchEstablishments",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchEstablishments();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const EstablishmentsSlice = createSlice({
  name: "establishments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstablishmentsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEstablishmentsList.fulfilled,
        (state, action: PayloadAction<Establishment[]>) => {
          state.status = "succeeded";
          state.establishments = action.payload;
        },
      )
      .addCase(fetchEstablishmentsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default EstablishmentsSlice.reducer;

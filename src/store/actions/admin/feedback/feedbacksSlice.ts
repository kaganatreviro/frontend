import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFeedbacksList } from "../../../../components/api/api";

export interface Feedback {
  id: number;
  user: string;
  display_user: string;
  created_at: string;
  establishment: number;
  text: string;
  answers: number;
}

interface FeedbacksState {
  feedbacks: Feedback[];
  status: "idle" | "loading" | "succeeded" | "failed";
  loading: boolean;
  error: string | null;
}

const initialState: FeedbacksState = {
  feedbacks: [],
  status: "idle",
  error: null,
  loading: false,
};

export const fetchFeedbacks = createAsyncThunk(
  "feedbacks/fetchFeedbacks",
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await fetchFeedbacksList(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action: PayloadAction<Feedback[]>) => {
        state.status = "succeeded";
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default feedbacksSlice.reducer;

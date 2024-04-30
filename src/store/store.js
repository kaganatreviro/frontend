import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/Establishment.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/Establishment.ts";
import authReducer from "./actions/authReducer.ts";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export default store;

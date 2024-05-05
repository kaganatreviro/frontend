import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/Establishment";
import authReducer from "./actions/authReducer";
import partnerReducer from "./actions/admin/partner/partnerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    // auth: authReducer,
    partner: partnerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

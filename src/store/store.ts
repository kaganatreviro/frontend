import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/Establishment";
import authReducer from "./actions/authReducer";
import partnerReducer from "./actions/admin/partner/partnerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    partner: partnerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

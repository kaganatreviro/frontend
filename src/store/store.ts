import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/partner/Establishment";
import authReducer from "./actions/authReducer";
import partnerReducer from "./actions/admin/partner/partnerSlice";
import profileReducer from "./actions/partner/profileSlice";
import tokenReducer from "./actions/token/tokenSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    partner: partnerReducer,
    partnerProfile: profileReducer,
    token: tokenReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./actions/authReducer";
import partnerReducer from "./actions/admin/partner/partnerSlice";
import profileReducer from "./actions/partner/profileSlice";
import tokenReducer from "./actions/token/tokenSlice";
import usersReducer from "./actions/admin/users/usersSlice";

const store = configureStore({
  reducer: {
    partner: partnerReducer,
    users: usersReducer,
    partnerProfile: profileReducer,
    token: tokenReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

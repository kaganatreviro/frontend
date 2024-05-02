/* eslint-disable */
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface Action {
  type: string;
  payload: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

const authReducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_REFRESH_TOKEN":
      return { ...state, refreshToken: action.payload };
    case "LOGOUT":
      return { ...state, accessToken: null, refreshToken: null };
    default:
      return state;
  }
};

export default authReducer;

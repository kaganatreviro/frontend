const initialState = {
  accessToken: null,
  refreshToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "SET_REFRESH_TOKEN":
      return { ...state, refreshToken: action.payload };
    case "LOGOUT":
      return { ...state, accessToken: null, refreshToken: null }; // Удаляем токены при выходе из системы
    default:
      return state;
  }
};

export default authReducer;

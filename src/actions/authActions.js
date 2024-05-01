export const setAccessToken = (accessToken) => ({
  type: "SET_ACCESS_TOKEN",
  payload: accessToken,
});

export const setRefreshToken = (refreshToken) => ({
  type: "SET_REFRESH_TOKEN",
  payload: refreshToken,
});

export const logout = () => ({
  type: "LOGOUT",
});

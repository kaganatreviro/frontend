export const setAccessToken = (accessToken) => {
  const token = accessToken || sessionStorage.getItem("authToken");
  return {
    type: "SET_ACCESS_TOKEN",
    payload: token,
  };
};

export const setRefreshToken = (refreshToken) => ({
  type: "SET_REFRESH_TOKEN",
  payload: refreshToken,
});

export const logout = () => ({
  type: "LOGOUT",
});

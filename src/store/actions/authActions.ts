export const setAccessToken = (accessToken: string | null) => {
  const token = accessToken || sessionStorage.getItem("authToken");
  return {
    type: "SET_ACCESS_TOKEN",
    payload: token,
  };
};

export const setRefreshToken = (refreshToken: string | null) => ({
  type: "SET_REFRESH_TOKEN",
  payload: refreshToken,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const setUserType = (userType: string | null) => ({
  type: "SET_USER_TYPE",
  payload: userType,
});

import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setRefreshToken } from "../actions/authActions";

function TokenRefresher() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      const refreshToken = async () => {
        try {
          const response = await axios.post(
            "http://16.170.203.161/api/v1/user/token/refresh/",
          );

          dispatch(setAccessToken(response.data.accessToken));
          dispatch(setRefreshToken(response.data.refreshToken));

          console.log("Tokens refreshed successfully!");
        } catch (error) {
          console.error("Error refreshing tokens:", error);
        }
      };

      const intervalId = setInterval(refreshToken, 30 * 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }, [accessToken, dispatch]);

  return null;
}

export default TokenRefresher;

import Profile from "../pages/profile";
import Main from "../pages/main";

export default {
  Main: {
    path: "/",
    element: <Main />, //
    protected: false,
    role: "all",
  },

  Menu: {
    path: "/profile",
    element: <Profile />, //
    protected: false,
    role: "all",
  },

  Profile: {
    path: "/profile",
    element: <Profile />, //
    protected: false,
    role: "all",
  },
};

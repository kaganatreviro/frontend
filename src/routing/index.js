import Profile from "../pages/profile";
import Main from "../pages/main";
import Users from "../pages/admin/users";
import Partners from "../pages/admin/partners";
import Feedback from "../pages/admin/feedback";
import Login from "../pages/login";

export default {
  Main: {
    path: "/",
    element: <Main />, //
    protected: false,
    role: "all",
  },
  AdminLogin: {
    path: "/login",
    element: <Login />, //
    protected: true,
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

  // ADMIN PANEL
  Users: {
    path: "/users",
    element: <Users />, //
    protected: false,
    role: "all",
  },
  PartnerLogin: {
    path: "/admin/login",
    element: <Login />, //
    protected: false,
    role: "all",
  },
  Partners: {
    path: "/partners",
    element: <Partners />, //
    protected: false,
    role: "all",
  },

  Categories: {
    path: "/categories",
    element: <Profile />, //
    protected: false,
    role: "all",
  },

  Feedback: {
    path: "/feedback",
    element: <Feedback />, //
    protected: false,
    role: "all",
  },
};

import Profile from "../pages/profile";
import Users from "../pages/admin/users";
import Partners from "../pages/admin/partners/Partners";
import Feedback from "../pages/admin/feedback/feedback";
import Login from "../pages/login";
import Categories from "../pages/admin/categories/categories";

export default {
  Main: {
    path: "/",
    element: <Users />, //
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
    element: <Categories />, //
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

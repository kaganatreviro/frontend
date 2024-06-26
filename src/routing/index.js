import Users from "../pages/admin/users/Users";
import Partners from "../pages/admin/partners/Partners";
import Feedback from "../pages/admin/feedback/feedback";
import Login from "../pages/login/Login";
import Categories from "../pages/admin/categories/categories";
import QRCodes from "../pages/partners/qrcode/qrcode";
import Establishments from "../pages/partners/establishments/establishments";
import Orders from "../pages/partners/orders/Order";
import Menu from "../pages/partners/menu/Menu";
import Profile from "../pages/partners/profile/Profile";
import EstablishmentSelection from "../pages/admin/feedback/EstablishmentChoose";
import Dashboard from "../pages/partners/dashboard/Dashboard";
import Subscriptions from "../pages/admin/subscriptions/Subscriptions";
import SubscriptionStatistics from "../pages/admin/Statistics/SubscriptionStatistics";

export default {
  Main: {
    path: "/",
    element: <Login />,
    protected: false,
    role: "all",
  },
  PartnerLogin: {
    path: "/login",
    element: <Login />,
    protected: true,
    role: "all",
  },

  QRCode: {
    path: "/qrcode",
    element: <QRCodes />,
    protected: false,
    role: "all",
  },
  SubscriptionStatistics: {
    path: "/subscription/statistics",
    element: <SubscriptionStatistics />,
    protected: false,
    role: "all",
  },
  Feedback: {
    path: "/feedback/",
    element: <Feedback />,
    protected: false,
    role: "all",
  },
  Establishments: {
    path: "/establishments",
    element: <Establishments />,
    protected: false,
    role: "all",
  },
  Orders: {
    path: "/orders",
    element: <Orders />,
    protected: false,
    role: "all",
  },
  Menu: {
    path: "/menu",
    element: <Menu />,
    protected: false,
    role: "all",
  },
  Profile: {
    path: "/profile",
    element: <Profile />,
    protected: false,
    role: "all",
  },

  Users: {
    path: "/users",
    element: <Users />,
    protected: false,
    role: "all",
  },
  AdminLogin: {
    path: "/admin/login",
    element: <Login />,
    protected: false,
    role: "all",
  },
  Partners: {
    path: "/partners",
    element: <Partners />,
    protected: false,
    role: "all",
  },

  Categories: {
    path: "/categories",
    element: <Categories />,
    protected: false,
    role: "all",
  },

  Subscriptions: {
    path: "/subscriptions",
    element: <Subscriptions />,
    protected: false,
    role: "all",
  },

  AdminFeedback: {
    path: "/admin/feedback/establishment",
    element: <Feedback />,
    protected: false,
    role: "all",
  },
  EstablishmentSelection: {
    path: "/admin/feedback",
    element: <EstablishmentSelection />,
    protected: false,
    role: "all",
  },

  Dashboard: {
    path: "/dashboard",
    element: <Dashboard />,
    protected: false,
    role: "all",
  },
};

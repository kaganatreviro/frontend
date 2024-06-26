import { useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { authNotRequiredPathes } from "./helpers/auth/authNotRequiredPathes";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import routing from "./routing";
import Navigation from "./components/common/Navigation";
import { RootState } from "./store/store";
import "antd/dist/reset.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const tokens = useSelector((state: RootState) => state.token);
  useEffect(() => {
    const authNotRequired = authNotRequiredPathes.some((path) => location.pathname.startsWith(path.replace(/\/:\w+\*?$/, "")));
    if (!authNotRequired && !tokens.access) {
      navigate("/login");
    }
  }, [tokens.access, navigate, location.pathname]);
  const isAdminLoginPage = location.pathname === "/admin/login";
  const isUserLoginPage = location.pathname === "/login";

  return (
    <main className="app flex justify-center">
      {!isAdminLoginPage && !isUserLoginPage && (
        <Navigation />
      )}
      <Routes>
        {Object.keys(routing).map((key) => {
          const route = routing[key];
          if (route.role === "all") {
            return (
              <Route key={key} path={route.path} element={route.element} />
            );
          }
          return null;
        })}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </main>
  );
}

export default App;

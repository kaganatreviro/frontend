import { useContext, useEffect } from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import routing from "./routing";
import Navigation from "./components/common/Navigation";
import { setUserType } from "./store/actions/authActions";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //     const authNotRequired = authNotRequiredPathes.some((path) => location.pathname.startsWith(path.replace(/\/:\w+\*?$/, "")));
  //     if (!authNotRequired && !authStore.token) {
  //         navigate("/dashboard");
  //     }
  // }, [authStore.token, navigate, location.pathname]);

  // usehistory
  const isAdminLoginPage = location.pathname === "/admin/login";
  const isUserLoginPage = location.pathname === "/login";
  const userType = localStorage.getItem("userType");
  console.log(userType);
  const authState = useSelector((state) => state.auth);
  console.log(authState);

  return (
    <main className="app flex justify-center">
      {!isAdminLoginPage && !isUserLoginPage && (
        <Navigation userType={userType} />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}

export default App;

// useEffect(() => {
//     const authNotRequired = authNotRequiredPathes.some((path) => location.pathname.startsWith(path.replace(/\/:\w+\*?$/, "")));
//     if (!authNotRequired && !authStore.token) {
//         navigate("/dashboard");
//     }
// }, [authStore.token, navigate, location.pathname]);

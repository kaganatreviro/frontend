import { useContext, useEffect } from "react";
import {
    Route, Routes, useLocation, Navigate, useNavigate,
} from "react-router-dom";
import routing from "./routing";
function App() {
    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const authNotRequired = authNotRequiredPathes.some((path) => location.pathname.startsWith(path.replace(/\/:\w+\*?$/, "")));
    //     if (!authNotRequired && !authStore.token) {
    //         navigate("/dashboard");
    //     }
    // }, [authStore.token, navigate, location.pathname]);

    return (
        <main className="app">
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

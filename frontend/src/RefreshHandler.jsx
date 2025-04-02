import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            // Redirect unauthenticated users trying to access protected routes
            if (location.pathname === "/blogdashboard" || location.pathname === "/quizdashboard") {
                navigate("/notfound", { replace: true });
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
};

export default RefreshHandler;

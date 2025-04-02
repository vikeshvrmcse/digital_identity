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
            setIsAuthenticated(false);

    
            if (location.pathname === "/blogdashboard" || location.pathname === "/quizdashboard") {
                navigate("/", { replace: true });
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
};

export default RefreshHandler;

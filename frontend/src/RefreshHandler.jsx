import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAuthenticated(true);

            // Corrected route checking
            // if (location.pathname === "/blogdashboard" || location.pathname === "/quizdashboard") {
            //     navigate("/", { replace: false });
            // }
        } else {
            // Redirect to 404 page if an invalid route is accessed
            navigate("/notfound", { replace: true });
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
};

export default RefreshHandler;

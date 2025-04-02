import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAuthenticated(true);

            if (location.pathname === "/blogdashboard" || location.pathname === "/quizdashboard") {
                navigate("/", { replace: false });
            }
        } else {
            
            console.log("Redirecting to *");
            navigate("*", { replace: true }); 
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
};

export default RefreshHandler;

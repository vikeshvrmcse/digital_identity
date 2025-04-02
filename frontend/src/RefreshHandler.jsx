import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRouting = ({ element }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        
        setLoading(false);
    }, []);

    if (loading) return <p>Loading...</p>;

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRouting;

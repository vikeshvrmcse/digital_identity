import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                px: 2
            }}
        >
            {/* Animated Waving Hand */}
            <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                style={{ fontSize: "4rem", marginBottom: "16px" }}
            >
                👋
            </motion.div>

            {/* Error Message */}
            <Typography
                variant="h2"
                sx={{ fontWeight: "bold", color: "#333", mb: 1 }}
            >
                404
            </Typography>

            <Typography
                variant="h5"
                sx={{ color: "#666", mb: 2 }}
            >
                Oops! Page Not Found
            </Typography>

            <Typography
                variant="body1"
                sx={{ color: "#888", maxWidth: "400px", mb: 3 }}
            >
                The page you're looking for doesn't exist or has been moved.
            </Typography>

            {/* Go Home Button */}
            <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", px: 4, py: 1.5, fontSize: "16px" }}
                onClick={() => navigate("/")}
            >
                Go Back Home
            </Button>
        </Box>
    );
}

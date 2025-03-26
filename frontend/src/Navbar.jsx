import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./GlobalContext"; // Corrected import

export default function Navbar() {
    const navigate = useNavigate();
    const { val, toggleTheme } = useContext(AppContext); // Use AppContext

    const handleAuthClick = () => {
      if (val) {
          toggleTheme(false);
          navigate('/')
           // Logout (set theme to false)
      } else {
          navigate("/signup"); // Go to signup when logging in
      }
      
  };

  const quizeForm=()=>{
    navigate('/quize')
    
  }
  const standardquizeForm=()=>{
    navigate('/quizdashboard')
    
  }
  const blogForm=()=>{
    navigate('/blogdashboard')
    
  }

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Typography sx={{ color: "#FFF2D8", fontFamily: "Roboto sans", letterSpacing: "2px", fontWeight: "bold" }}>
                        DIGITAL
                    </Typography>
                    <Typography sx={{ color: "#BCA37F", fontWeight: "bold", letterSpacing: "3px" }}>
                        IDENTITY
                    </Typography>
                </Box>

                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>

                    <Button color="inherit" onClick={handleAuthClick}>
                        {val ? "Logout" : "Login"}
                    </Button>

                    {val && (
                        <><Button color="inherit" onClick={quizeForm}>
                            Quiz
                        </Button>
                        <Button color="inherit" onClick={standardquizeForm}>
                            Quiz Dashboard
                        </Button>
                        <Button color="inherit" onClick={blogForm}>
                            Blog
                        </Button></>
                    )}

                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

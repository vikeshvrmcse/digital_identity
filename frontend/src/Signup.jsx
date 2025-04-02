import React, { useState, useContext } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Footer from './Footer';
import { AppContext } from './GlobalContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "./Utils";
import axios from "axios";

export default function Signup() {
    const { val, toggleTheme } = useContext(AppContext);
    const [condition, setCondition] = useState('');
    const [state, setState] = useState(false);
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async(data) => {
        if (condition === 'Login') {

            const { name, ...loginData } = data;
            
            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(loginData),
                });

                if (!response.ok) {
                    throw new Error("Failed to login data");
                }

                const result = await response.json();
                console.log(result)

                if (result.success) {
                    const token = result.jwtToken; 
                    
                    localStorage.setItem("token", token);
              
                    
                    const decodedToken = JSON.parse(atob(token.split(".")[1]));
                    
                    const userId = decodedToken.userId; 
                    
                    
              
                    localStorage.setItem("userId", userId);
                    localStorage.setItem("email", result.email);
                    localStorage.setItem("name", result.name); 
              
                    console.log("Login successful! User ID:", userId);
                    handleSuccess(result.userId)
                    toggleTheme();
                    reset();
                    navigate('/')
                  }  
              } catch (error) {
                handleError("Something error..."+error)
                reset();
              }
        }else{

            try {
                const response = await fetch(`${API_URL}/auth/signup`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                });
          
                if (!response.ok) {
                  throw new Error("Failed to signup data");
                }
          
                const result = await response.json();
                handleSuccess(result.message);
                reset();
              } catch (error) {
                handleError("Something error..."+error)
                reset();
              }
        }
    };

    return (
        <>
        {<ToastContainer/>}
            <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                    minHeight: '80vh',
                    px: 2,
                    width: '100%', 
                }}
            >
                {/* Top Navigation Buttons */}
                <Grid container spacing={2} sx={{ maxWidth: 380, width: '100%', mb: 2}}>
                    <Grid item xs={6} sx={{}}>
                        <Button
                            fullWidth
                            variant={!state ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => setState(false)}
                        >
                            Signup
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant={state ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => setState(true)}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>

                {/* Forms */}
                <Box sx={{ width: '100%', maxWidth: 400, px: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card sx={{ p: 3, boxShadow: 3, width: '100%' }}>
                            <CardHeader title={state ? "Login Form" : "Registration Form"} />
                            <CardContent>
                                <Grid container spacing={2}>
                                    {/* Name Field (Only for Signup) */}
                                    {!state && (
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                {...register('name', { required: 'Name is required' })}
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                            />
                                        </Grid>
                                    )}

                                    {/* Email Field */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            {...register('email', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                    message: 'Enter a valid email'
                                                }
                                            })}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    </Grid>

                                    {/* Password Field */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must be at least 6 characters long'
                                                }
                                            })}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                        />
                                    </Grid>

                                    {/* Buttons */}
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => setCondition(state ? 'Login' : 'Registration')}
                                                >
                                                    {state ? "Login" : "Submit"}
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    color="primary"
                                                    type="button"
                                                    onClick={() => reset()}
                                                >
                                                    Reset
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </Box>
            </Stack>
            <Footer />
        </>
    );
}

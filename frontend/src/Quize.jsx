import React, { useState, createContext, useContext } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Footer from './Footer';
import { AppContext } from "./GlobalContext";
export default function Quize() {
    const { theme, toggleTheme } = useContext(AppContext)
    const [condition, setCondition] = useState('')
    const [state, setState] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        if (condition === 'Login') {
            toggleTheme();
        }
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <>
            <Stack justifyContent="center" alignItems="center" width="100%" sx={{ marginBottom: 4 }} >
                {/* Top Navigation Buttons */}
                <Grid container spacing={2} justifyContent="center" alignItems="center" p={0} sx={{ width: "80%",  mb: 2 }}>
                    <Grid  item lg={12} m={0}>
                        <Box sx={{ mt: 2, p: 2, mb: 2, backgroundColor: '#113946' }}>
                            <Typography variant="h4" color="secondary" align="center">Save Quizes Details</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card sx={{ width: '80%', p: 2, boxShadow: 3, mx: 'auto' }}>
                        <CardHeader title="Quize Form" />
                        <CardContent>
                            <Grid container spacing={2}>
                                {/* Question Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Question Description"
                                        type="text"
                                        {...register('question', { required: 'Question is required' })}
                                        error={!!errors.question}
                                        helperText={errors.question?.message}
                                    />
                                </Grid>

                                {/* Option A Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Option A"
                                        type="text"
                                        {...register('optiona', {
                                            required: 'Option a is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter a valid email'
                                            }
                                        })}
                                        error={!!errors.optiona}
                                        helperText={errors.optiona?.message}
                                    />
                                </Grid>
                                {/* Option B Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Option B"
                                        type="text"
                                        {...register('optionb', {
                                            required: 'Option b is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter a valid option'
                                            }
                                        })}
                                        error={!!errors.optionb}
                                        helperText={errors.optionb?.message}
                                    />
                                </Grid>
                                {/* Option C Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Option C"
                                        type="text"
                                        {...register('optionc', {
                                            required: 'Option c is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter a valid option'
                                            }
                                        })}
                                        error={!!errors.optionc}
                                        helperText={errors.optionc?.message}
                                    />
                                </Grid>
                                {/* Option D Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Option D"
                                        type="text"
                                        {...register('optiond', {
                                            required: 'Option d is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter a valid option'
                                            }
                                        })}
                                        error={!!errors.optiond}
                                        helperText={errors.optiond?.message}
                                    />
                                </Grid>

                                {/* Question duration Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Question duration"
                                        type="number"
                                        {...register('time', { required: 'Time is required' })}
                                        error={!!errors.time}
                                        helperText={errors.time?.message}
                                    />
                                </Grid>



                                {/* Buttons */}
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button fullWidth variant="contained" color="primary" type="submit" onClick={() => setCondition('Registration')}>
                                                Save
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button fullWidth variant="outlined" color="primary" type="button" onClick={() => reset()}>
                                                Reset
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </Stack>
            <Footer />
        </>
    );
}


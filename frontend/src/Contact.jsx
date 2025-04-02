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
                
                <Grid container spacing={2} justifyContent="center" alignItems="center" p={0} sx={{ width: "80%",  mb: 2 }}>
                    <Grid  item lg={12} m={0}>
                        <Box sx={{ mt: 2, p: 2, mb: 2, backgroundColor: '#113946' }}>
                            <Typography variant="h4" color="secondary" align="center">Contact us</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card sx={{ width: '80%', p: 2, boxShadow: 3, mx: 'auto' }}>
                        <CardHeader title="Fill and press send message" />
                        <CardContent>
                            <Grid container spacing={2}>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Enter phone number"
                                        type="text"
                                        {...register('question', { required: 'Phone is required' })}
                                        error={!!errors.question}
                                        helperText={errors.question?.message}
                                    />
                                </Grid>

                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First problem"
                                        type="text"
                                        {...register('optiona', {
                                            required: 'Problem first is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter problem first'
                                            }
                                        })}
                                        error={!!errors.optiona}
                                        helperText={errors.optiona?.message}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Second problem"
                                        type="text"
                                        {...register('optionb', {
                                            required: 'Second problem optional',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter a valid problem'
                                            }
                                        })}
                                        error={!!errors.optionb}
                                        helperText={errors.optionb?.message}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Second problem"
                                        type="text"
                                        {...register('optionc', {
                                            required: 'Third problem optional',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter third problem'
                                            }
                                        })}
                                        error={!!errors.optionc}
                                        helperText={errors.optionc?.message}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Fourth problem"
                                        type="text"
                                        {...register('optiond', {
                                            required: 'Fourth problem optional',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Enter fourth problem'
                                            }
                                        })}
                                        error={!!errors.optiond}
                                        helperText={errors.optiond?.message}
                                    />
                                </Grid>

                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Select time"
                                        type="time"
                                        {...register('time', { required: 'Time is required' })}
                                        error={!!errors.time}
                                        helperText={errors.time?.message}
                                    />
                                </Grid>



                          
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Button fullWidth variant="contained" color="primary" type="submit" onClick={() => setCondition('Registration')}>
                                                Send Me
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


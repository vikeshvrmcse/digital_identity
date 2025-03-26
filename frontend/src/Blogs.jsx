import React, { useState } from "react";
import { Container, TextField, Button, Stepper, Grid, Step, Paper, StepLabel, Typography, Card, CardMedia, Box, TableContainer, Table, TableBody, ListItem, TableRow, TableCell, Stack } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Footer from "./Footer";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
const MultiStepBlogForm = () => {
    const completeForm = [
        { label: "Title", value: "Vikesh Kumar Verma" },
        { label: "Author", value: "Computer Science & Engineering" },
        { label: "Category", value: "B.Tech" },
        { label: "Content", value: "3rd Year" },
        { label: "SEO - Title", value: "3rd Year" },
        { label: "SEO - Description", value: "3rd Year" },
    ];
    const [step, setStep] = useState(0);
    const [blogData, setBlogData] = useState({
        title: "",
        author: "",
        category: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        image: null, // Store image file
        imagePreview: "", // Store preview URL
    });

    

    const steps = ["Blog Details", "Content", "Image Upload", "SEO & Publish", "Review & Submit"];

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlogData({
                ...blogData,
                image: file,
                imagePreview: URL.createObjectURL(file), // Preview the selected image
            });
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <>
        <Container maxWidth="lg" sx={{mb:4, mt:4}}>
            <Box sx={{ mt: 2, p: 2, mb: 2, backgroundColor: '#113946' }}>
                <Typography variant="h4" color="secondary" align="center">Create a Blog</Typography>
            </Box>
            <Stepper activeStep={step} sx={{ mt: 5, mb: 3 }}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel
                            sx={{
                                "& .MuiStepLabel-label": {
                                    fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" }, // Adjust sizes as needed
                                },
                               
                                
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>


            {step === 0 && (
                <>
                    <TextField fullWidth label="Title" name="title" value={blogData.title} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Author" name="author" value={blogData.author} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Category" name="category" value={blogData.category} onChange={handleChange} margin="normal" />
                </>
            )}

            {step === 1 && (
                <>
                    <TextField fullWidth multiline rows={6} label="Content" name="content" value={blogData.content} onChange={handleChange} margin="normal" />
                </>
            )}

            {step === 2 && (
                <>
                    <Box sx={{ mt: 5, mb: 2, justifyContent:'center' }}>
                        <Typography variant="h6">Upload Blog Cover Image</Typography>
                        <Button component="label"
                            role={undefined}
                            variant="contained"
                            fullWidth
                            sx={{height:'10vh'}}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />} >Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleImageUpload}
                            multiple
                        />
                        </Button>
                        {blogData.imagePreview && (
                            <Card sx={{ mt: 2, width:'300px' }}>
                                <CardMedia component="img" image={blogData.imagePreview} alt="Blog Cover" />
                            </Card>
                        )}
                    </Box>
                </>
            )}

            {step === 3 && (
                <>
                    <TextField fullWidth label="SEO Title" name="metaTitle" value={blogData.metaTitle} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="SEO Description" name="metaDescription" value={blogData.metaDescription} onChange={handleChange} margin="normal" />
                </>
            )}

            {step === 4 && (
                <>
                    <Grid>
                        <TableContainer component={Paper} sx={{ mt: 3 }}>
                            <Box sx={{ backgroundColor: '#BCA37F' }}>
                                <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }} textAlign={'center'}>
                                    Review Your Blog
                                </Typography>
                            </Box>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                                        <TableCell>{blogData.title}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
                                        <TableCell>{blogData.author}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                                        <TableCell>{blogData.category}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Content</TableCell>
                                        <TableCell>{blogData.content}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>SEO Title</TableCell>
                                        <TableCell>{blogData.metaTitle}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>SEO Description</TableCell>
                                        <TableCell>{blogData.metaDescription}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Box>
                    {blogData.imagePreview && (
                        <Card sx={{ mt: 2, maxWidth: "100%", }}>
                            <CardMedia component="img" image={blogData.imagePreview} alt="Blog Cover Preview" />
                        </Card>
                    )}
                    </Box>
                </>
            )}

            <div style={{ marginTop: 20 }}>
                {step > 0 && <Button onClick={prevStep} variant="contained" style={{ marginRight: 10 }}>Back</Button>}
                {step < steps.length - 1 ? (
                    <Button onClick={nextStep} variant="contained" color="primary">Next</Button>
                ) : (
                    <Button variant="contained" color="success" onClick={() => alert("Blog Submitted!")}>Submit</Button>
                )}
            </div>
        </Container>
        <Footer />
        </>
    );
};

export default MultiStepBlogForm;

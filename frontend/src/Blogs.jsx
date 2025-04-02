import React, { useState,useEffect } from "react";
import axios from "axios";
import { 
    Container, TextField, Button, Stepper, Grid, Step, Paper, StepLabel, Typography, Card, 
    CardMedia, Box, TableContainer, Table, TableBody, TableRow, TableCell, Snackbar, Alert 
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Footer from "./Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const MultiStepBlogForm = () => {
    const steps = ["Blog Details", "Content", "Image Upload", "SEO & Publish", "Review & Submit"];
    
    const [step, setStep] = useState(0);
    const [token, setToken] = useState('')
    const [blogData, setBlogData] = useState({
        userId:localStorage.getItem('userId'),
        title: "",
        author: "",
        category: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        image: null,
        imagePreview: "",
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setToken(localStorage.getItem('token'))
      }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlogData({
                ...blogData,
                image: file,
                imagePreview: URL.createObjectURL(file),
            });
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = async () => {
        try {
            if (!blogData.title || !blogData.content || !blogData.image || !blogData.imagePreview) {
                setSnackbar({ open: true, message: "All fields are required!", severity: "warning" });
                return;
            }
    
            const formData = new FormData();
            formData.append("title", blogData.title);
            formData.append("author", blogData.author);
            formData.append("category", blogData.category);
            formData.append("content", blogData.content);
            formData.append("metaTitle", blogData.metaTitle);
            formData.append("metaDescription", blogData.metaDescription);
            formData.append("image", blogData.image);
            formData.append("imagePreview", blogData.imagePreview);
    
            const token = localStorage.getItem("token"); 
            if (!token) {
                setSnackbar({ open: true, message: "Unauthorized. Please log in!", severity: "error" });
                return;
            }
    
            console.log("Sending imagePreview:", blogData.imagePreview); // Debugging
    
            const response = await axios.post(`${API_URL}/blogs/create_blogs`, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `${token}`
                },
            });
    
            if (response.status === 201) {
                setSnackbar({ open: true, message: "Blog Created Successfully!", severity: "success" });
    
                setBlogData({
                    title: "",
                    author: "",
                    category: "",
                    content: "",
                    metaTitle: "",
                    metaDescription: "",
                    image: null,
                    imagePreview: "",
                });
                setStep(0);
            }
        } catch (error) {
            console.error("Axios Error:", error.response?.data || error.message);
            setSnackbar({ open: true, message: "Error creating blog. Try again!", severity: "error" });
        }
    };
    
    
    

    return (
        <>
            <Container maxWidth="lg" sx={{ mb: 4, mt: 4 }}>
                <Box sx={{ mt: 2, p: 2, mb: 2, backgroundColor: "#113946" }}>
                    <Typography variant="h4" color="secondary" align="center">Create a Blog</Typography>
                </Box>
                
                <Stepper activeStep={step} sx={{ mt: 5, mb: 3 }}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel sx={{ "& .MuiStepLabel-label": { fontSize: { xs: "0.6rem", sm: "1rem", md: "1.2rem" } } }}>
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
                        <Box sx={{ mt: 5, mb: 2, justifyContent: "center" }}>
                            <Typography variant="h6">Upload Blog Cover Image</Typography>
                            <Button component="label" variant="contained" fullWidth sx={{ height: "10vh" }} startIcon={<CloudUploadIcon />}>
                                Upload files
                                <VisuallyHiddenInput type="file" onChange={handleImageUpload} />
                            </Button>
                            {blogData.imagePreview && (
                                <Card sx={{ mt: 2, width: "300px" }}>
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
                                <Box sx={{ backgroundColor: "#BCA37F" }}>
                                    <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }} textAlign={"center"}>
                                        Review Your Blog
                                    </Typography>
                                </Box>
                                <Table>
                                    <TableBody>
                                        <TableRow><TableCell sx={{ fontWeight: "bold" }}>Title</TableCell><TableCell>{blogData.title}</TableCell></TableRow>
                                        <TableRow><TableCell sx={{ fontWeight: "bold" }}>Author</TableCell><TableCell>{blogData.author}</TableCell></TableRow>
                                        <TableRow><TableCell sx={{ fontWeight: "bold" }}>Category</TableCell><TableCell>{blogData.category}</TableCell></TableRow>
                                        <TableRow><TableCell sx={{ fontWeight: "bold" }}>Content</TableCell><TableCell>{blogData.content}</TableCell></TableRow>
                                        <TableRow><TableCell sx={{ fontWeight: "bold" }}>SEO Title</TableCell><TableCell>{blogData.metaTitle}</TableCell></TableRow>
                                        <TableRow><TableCell sx={{ fontWeight: "bold" }}>SEO Description</TableCell><TableCell>{blogData.metaDescription}</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </>
                )}

                <div style={{ marginTop: 20 }}>
                    {step > 0 && <Button onClick={prevStep} variant="contained" style={{ marginRight: 10 }}>Back</Button>}
                    {step < steps.length - 1 ? (
                        <Button onClick={nextStep} variant="contained" color="primary">Next</Button>
                    ) : (
                        <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
                    )}
                </div>
            </Container>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>

            <Footer />
        </>
    );
};

export default MultiStepBlogForm;

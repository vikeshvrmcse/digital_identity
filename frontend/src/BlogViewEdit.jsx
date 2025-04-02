import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Button, TextField } from "@mui/material";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const BlogViewEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog; 
  const token = localStorage.getItem("token");

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(blog || {});

  if (!blog) return <Typography>Invalid Blog Data</Typography>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/blogs/${blog._id}`, formData, {
        headers: { "Content-Type": "application/json", Authorization: `${token}` },
      });
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {isEdit ? (
          <>
            <Typography variant="h5">Edit Blog</Typography>
            <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Author" name="author" value={formData.author} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} sx={{ mt: 2 }} />
            <TextField fullWidth label="Content" name="content" multiline rows={4} value={formData.content} onChange={handleChange} sx={{ mt: 2 }} />
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 3 }}>Save</Button>
          </>
        ) : (
          <>
            <Typography variant="h4">{blog.title}</Typography>
            <Typography variant="h4">{blog._id}</Typography>
            <Typography variant="subtitle1">By {blog.author}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{blog.content}</Typography>
            <img src={`data:image/png;base64,${blog.image}`} alt={blog.title} style={{ width: "100%", marginTop: "20px" }} />
            <Button variant="contained" color="secondary" onClick={() => setIsEdit(true)} sx={{ mt: 3, mr: 2 }}>Edit</Button>
            <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 3 }}>Back</Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default BlogViewEdit;

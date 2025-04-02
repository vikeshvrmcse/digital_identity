import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Grid, Paper, Container, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/blogs/user_blogs/api`, {
          headers: { Authorization: `${token}` },
        });
        setBlogs(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("No blogs found (404)");
        } else {
          console.error("Error fetching blogs:", error);
        }
      }
    };
    fetchBlogs();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/blogs/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };


  const filteredBlogs = selectedFilter ? blogs.filter((blog) => blog.category === selectedFilter) : blogs;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ backgroundColor: "#113946" }} p={4}>
          <AppBar position="static" sx={{ border: "2px solid #BCA37F", backgroundColor: "#BCA37F" }}>
            <Toolbar>
              <Typography color="primary" variant="h6" sx={{ flexGrow: 1 }}>
                Blog Dashboard
              </Typography>
              <Button color="inherit" variant="outlined" onClick={() => navigate("/blog")}>Write Blog</Button>
            </Toolbar>
          </AppBar>

          <Grid container spacing={2} sx={{ my: 2, alignItems: "center", justifyContent: "center" }}>
            <Grid item lg={12} mb={1}>
              <Typography textAlign="center" variant="subtitle1" color="secondary">
                CATEGORIES
              </Typography>
            </Grid>
            <Stack direction="row">
              {[...new Set(blogs.map((blog) => blog.category))].map((filter, index) => (
                <Box key={index} px={2}>
                  <Button
                    variant={selectedFilter === filter ? "contained" : "outlined"}
                    color={selectedFilter === filter ? "secondary" : "accent"}
                    onClick={() => setSelectedFilter(selectedFilter === filter ? "" : filter)}
                  >
                    {filter}
                  </Button>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Box>

        <Grid container spacing={3} mt={2}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Grid item xs={12} sm={6} key={blog._id}>
                <Paper elevation={3} sx={{ height: 250, p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  {blog.image && (
                    <img src={`data:image/png;base64,${blog.image}`} alt={blog.title} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                  )}
                  <Typography variant="h6" textAlign="center">{blog.title}</Typography>
                  <Stack direction="row" spacing={1} justifyContent="center">
                  <Button color="green" onClick={() => navigate(`/blogs/view/${blog._id}`, { state: { blog } })}>View</Button>
                  <Button onClick={() => navigate(`/blogs/edit/${blog._id}`, { state: { blog } })}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(blog._id)}>Delete</Button>
                  </Stack>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
              No blogs found for this category.
            </Typography>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default BlogDashboard;

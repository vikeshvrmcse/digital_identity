import {React, useState} from "react";
import { AppBar, Toolbar, Typography, Button, Grid, Paper, Container, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const BlogDashboard = () => {
    const allBlogs = [
        { id: 1, title: "React Basics", category: "f1" },
        { id: 2, title: "Material UI Guide", category: "f2" },
        { id: 3, title: "Advanced React", category: "f3" },
        { id: 4, title: "MongoDB Setup", category: "f1" },
        { id: 5, title: "Node.js Express", category: "f2" },
        { id: 6, title: "REST API Design", category: "f4" },
      ];

      const [selectedFilter, setSelectedFilter] = useState("");

      const filteredBlogs = selectedFilter
        ? allBlogs.filter((blog) => blog.category === selectedFilter)
        : allBlogs;
        
    const navigate=useNavigate()
    const writeBlog=()=>{
        navigate('/blog')
    }
  return (
    <>
    <Container maxWidth="lg" sx={{mt:4, mb:4}} >
      {/* Header */}
      <Box sx={{backgroundColor:'#113946'}} p={4}>
      <AppBar position="static" sx={{border:'2px solid #BCA37F', backgroundColor:"#BCA37F"}}  >
        <Toolbar>
          <Typography color="primary" variant="h6" sx={{ flexGrow: 1 }}>
            Blog Dashboard
          </Typography>
          <Button color="inherit" variant="outlined" onClick={writeBlog} >Write Blog</Button>
        </Toolbar>
      </AppBar>

      {/* Filters */}
      <Grid container spacing={2} sx={{ my: 2, alignItems: "center", justifyContent:'center'}} >
        <Grid item lg={12} mb={1}>
          <Typography textAlign={'center'} variant="subtitle1" color="secondary">CATEGORIES</Typography>
        </Grid>
        <Stack direction={'row'}>
        {["f1", "f2", "f3", "f4"].map((filter, index) => (
          <Box key={index} px={2}>
            <Button variant={selectedFilter === filter ? "contained" : "outlined"}
              color={selectedFilter === filter ? "secondary" : "accent"}
              onClick={() => setSelectedFilter(selectedFilter === filter ? "" : filter)}>{filter}</Button>
          </Box>
        ))}
        </Stack>
      </Grid>
      </Box>
      {/* Blog Grid */}
      <Grid container spacing={3} mt={2}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Grid item xs={12} sm={6} key={blog.id}>
              <Paper elevation={3} sx={{ height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h6">{blog.title}</Typography>
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
    <Footer/>
    </>
  );
};

export default BlogDashboard;

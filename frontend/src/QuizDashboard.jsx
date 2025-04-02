import React, { useState, useEffect } from "react";
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, TextField, Select, MenuItem, IconButton, Snackbar, Alert
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const QuizDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
  axios.get(`${API_URL}/quizzes`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        if (Array.isArray(response.data.quizzes)) {
          setQuizzes(response.data.quizzes);
        } else {
          console.error("Invalid data format:", response.data);
        }
      })
      .catch(error => console.error("Fetch error:", error));
  }, []);

  const addQuiz = () => navigate("/standardquiz");

  const handleDelete = async (quizId) => {
    try {
      const response = await axios.delete(`${API_URL}/quizzes/delete_quizzes/${quizId}`, {
        headers: { "Authorization": `${localStorage.getItem("token")}` }
      });
      if (response.status === 200) {
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
        setSnackbarMessage("Quiz deleted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error deleting quiz!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? quiz.category.toLowerCase() === categoryFilter.toLowerCase() : true) &&
    (difficultyFilter ? quiz.difficulty.toLowerCase() === difficultyFilter.toLowerCase() : true)
  );


  const handleView = (quiz) => {
    navigate(`/quizes/${quiz._id}`, { state: { quiz } }); 
  };
  const handleEdit = (quiz) => {
    navigate(`/quizes/${quiz._id}`, { state: { quiz } });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Quiz Dashboard</Typography>

      
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search by Title"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={categoryFilter || ""}
          onChange={(e) => setCategoryFilter(e.target.value || "")}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Programming">Programming</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </Select>
        <Select
          value={difficultyFilter || ""}
          onChange={(e) => setDifficultyFilter(e.target.value || "")}
          displayEmpty
        >
          <MenuItem value="">All Difficulties</MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </Box>

      {/* 📋 Quiz Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Difficulty</strong></TableCell>
              <TableCell><strong>Questions</strong></TableCell>
              <TableCell><strong>Passing Score</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuizzes.length > 0 ? filteredQuizzes.map((quiz) => (
              <TableRow key={quiz._id}>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>{quiz.category}</TableCell>
                <TableCell>{quiz.difficulty}</TableCell>
                <TableCell>{quiz.questions.length}</TableCell>
                <TableCell>{quiz.passingScore}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleView(quiz)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="warning" onClick={() => handleEdit(quiz)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(quiz._id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No quizzes found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ➕ Add Quiz Button */}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button variant="contained" color="primary" onClick={addQuiz}>+ Add New Quiz</Button>
      </Box>

      {/* 🔔 Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuizDashboard;

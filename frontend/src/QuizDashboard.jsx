import React, { useState } from "react";
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, TextField, Select, MenuItem, IconButton
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const sampleQuizzes = [
  { id: 1, title: "React Basics", category: "Technology", difficulty: "Easy", questions: 10, timeLimit: 300 },
  { id: 2, title: "Python Advanced", category: "Programming", difficulty: "Hard", questions: 15, timeLimit: 600 },
  { id: 3, title: "Business Analytics", category: "Business", difficulty: "Medium", questions: 12, timeLimit: 450 },
];

const QuizDashboard = () => {
  const navigate=useNavigate()
  const [quizzes, setQuizzes] = useState(sampleQuizzes);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  const addQuiz=()=>{
    navigate('/standardquiz')
  }

  // Handle Search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Filter
  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleDifficultyFilter = (event) => {
    setDifficultyFilter(event.target.value);
  };

  // Filtered Quiz List
  const filteredQuizzes = quizzes.filter((quiz) => {
    return (
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? quiz.category === categoryFilter : true) &&
      (difficultyFilter ? quiz.difficulty === difficultyFilter : true)
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Quiz Dashboard
      </Typography>

      {/* Search & Filter */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search by Title"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select value={categoryFilter} onChange={handleCategoryFilter} displayEmpty>
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Programming">Programming</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </Select>
        <Select value={difficultyFilter} onChange={handleDifficultyFilter} displayEmpty>
          <MenuItem value="">All Difficulties</MenuItem>
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </Box>

      {/* Quiz Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Difficulty</strong></TableCell>
              <TableCell><strong>Questions</strong></TableCell>
              <TableCell><strong>Time Limit (Sec)</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{quiz.category}</TableCell>
                  <TableCell>{quiz.difficulty}</TableCell>
                  <TableCell>{quiz.questions}</TableCell>
                  <TableCell>{quiz.timeLimit}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton color="warning">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No quizzes found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Quiz Button */}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button variant="contained" color="primary" onClick={addQuiz}>
          + Add New Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default QuizDashboard;

import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, IconButton, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "./Utils";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const QuizEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz = location.state?.quiz;
  
  const [formData, setFormData] = useState(quiz || {
    title: "",
    description: "",
    category: "",
    difficulty: "",
    passingScore: "",
    questions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/quizzes/update_quizzes/${quiz._id}`, formData, {
        headers: { "Authorization": `${localStorage.getItem("token")}` },
      });
      handleSuccess("Updated successfully")
    } catch (error) {
      handleError("Not updated check now")
      console.error("Error updating quiz:", error);
    }
  };


  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }],
    }));
  };

  if (!quiz) return <Typography variant="h6" color="error">No quiz data available. Please go back to the dashboard.</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Edit Quiz</Typography>
      {<ToastContainer/>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Passing Score" name="passingScore" value={formData.passingScore} onChange={handleChange} variant="outlined" type="number" />
          </Grid>

          {/* Questions Section */}
          <Grid item xs={12}>
            <Typography variant="h6" mb={2}>Questions</Typography>
            {formData.questions.map((question, index) => (
              <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Question Text"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Options (comma separated)"
                      value={question.options.join(", ")}
                      onChange={(e) => handleQuestionChange(index, "options", e.target.value.split(",").map(opt => opt.trim()))}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Correct Answer"
                      value={question.correctAnswer}
                      onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}

            <Button variant="contained" color="primary" startIcon={<AddCircle />} onClick={addQuestion}>
              Add Question
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button variant="contained" sx={{mx:2}} onClick={()=>navigate(-1)} color="default">Back</Button>
          <Button variant="contained" type="submit" color="primary">Save Changes</Button>

        </Box>
      </form>
    </Box>
  );
};

export default QuizEdit;

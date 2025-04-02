import {React, useEffect, useState} from "react";
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const QuizView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz, setQuiz]=useState(null)

  useEffect(()=>{
    const quizs = location.state?.quiz;
    setQuiz(quizs)
  },[])
  if (!quiz) {
    return <Typography variant="h6" color="error">No quiz data available. Please go back to the dashboard.</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>{quiz.title}</Typography>
      <Typography variant="h6" mb={2}><strong>Category:</strong> {quiz.category}</Typography>
      <Typography variant="h6" mb={2}><strong>Difficulty:</strong> {quiz.difficulty}</Typography>
      <Typography variant="h6" mb={2}><strong>Description:</strong> {quiz.description}</Typography>
      <Typography variant="h6" mb={2}><strong>Passing Score:</strong> {quiz.passingScore}</Typography>

      {/* Questions Table */}
      <Typography variant="h5" mt={3}>Questions</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Question</strong></TableCell>
              <TableCell><strong>Options</strong></TableCell>
              <TableCell><strong>Correct Answer</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quiz.questions?.map((question) => (
              <TableRow key={question._id}>
                <TableCell>{question.questionText}</TableCell>
                <TableCell>{question.options.join(", ")}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Button */}
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Button variant="contained" sx={{ mx: 2 }} onClick={() => navigate(-1)} color="default">Back</Button>
        <Button variant="contained" color="primary" onClick={() => navigate(`/quizes/edit/${quiz._id}`, { state: { quiz } })}>
          Edit Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default QuizView;

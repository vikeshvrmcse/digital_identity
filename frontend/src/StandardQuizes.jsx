import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardMedia, TextField, Typography, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel, CardContent, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const steps = ["Quiz Details", "Add Questions", "Review & Submit"];
import { styled } from '@mui/material/styles';
import { ToastContainer } from "react-toastify";
import axios from 'axios'
const API_URL = import.meta.env.VITE_BACKEND_URL;
import { handleSuccess, handleError } from "./Utils";
const StandardQuizes = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [choose, setChoose] = useState(0)
  const [token, setToken] = useState('')
  
  const [quizData, setQuizData] = useState({
    userId: "",
    title: "",
    description: "",
    category: "",
    difficulty: "",
    passingScore: "",
    questions: [
      {
        questionText: "",
        image: null,
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
        timeLimit: "",
      },
    ],
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setToken(localStorage.getItem('token'))
    if (storedUserId) {
      setQuizData((prev) => ({ ...prev, userId: storedUserId }));
    }
  }, []);


  const handleChange = (e) => {
    setQuizData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleQuestionChange(index, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionChange = (index, field, value) => {
    setQuizData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index][field] = value;
      return { ...prev, questions: updatedQuestions };
    });
  };


  const addNewQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { questionText: "", options: ["", "", "", ""], correctAnswer: "", explanation: "", timeLimit: "", image: "" },
      ],
    }));
  };


  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);


  const handleSubmit = async () => {
    console.log("Submitting Quiz Data:", quizData);

    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/quizzes/create_quizzes`, quizData, {
        headers: { Authorization: `${token}` },
      });
      handleSuccess("Quiz saved successfully")
      console.log("Quiz saved successfully:", response.data);
      
    } catch (error) {
      handleError("Error saving quiz:"+ `${error.response ? error.response.data : error.message}`)
      
    }
  };

  
  
  return (
    
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      {<ToastContainer/>}
      <Stack sx={{ mt: 2, p: 2, backgroundColor: '#113946' }} mb={5}>
        <Typography variant="h4" color="secondary" align="center">Save Quizes Details</Typography>
      </Stack>
      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      
      {activeStep === 0 && (
        <Box>
          <TextField fullWidth label="Quiz Title" name="title" value={quizData.title} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Quiz Description" name="description" value={quizData.description} onChange={handleChange} multiline rows={2} sx={{ mb: 2 }} />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select name="category" label="Category" value={quizData.category} onChange={handleChange}>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Difficulty Level</InputLabel>
            <Select name="difficulty" label="Difficulty Level" value={quizData.difficulty} onChange={handleChange}>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <TextField fullWidth type="number" label="Passing Score (%)" name="passingScore" value={quizData.passingScore} onChange={handleChange} sx={{ mb: 2 }} />
        </Box>
      )}

      {/* Step 2: Add Questions */}
      {activeStep === 1 && (


        <Grid>
          <Stack direction={'row'} spacing={4} mt={4} mb={3}>

            <Button fullWidth variant="outlined" onClick={() => setChoose(1)}>Only Question</Button>


            <Button fullWidth variant="outlined" onClick={() => setChoose(2)}>Only Image</Button>


            <Button fullWidth variant="outlined" onClick={() => setChoose(3)}>Question with Image</Button>


          </Stack>
          <Stack>
            {choose === 1 && (<WithQuestion quizData={quizData} handleQuestionChange={handleQuestionChange} addNewQuestion={addNewQuestion} handleImageUpload={handleImageUpload} />)}
          </Stack>
          <Stack>
            {choose === 2 && (<ImageWithoutQuestion quizData={quizData} handleQuestionChange={handleQuestionChange} addNewQuestion={addNewQuestion} handleImageUpload={handleImageUpload} />)}
          </Stack>
          <Stack>
            {choose === 3 && (<ImageWithQuestion quizData={quizData} handleQuestionChange={handleQuestionChange} addNewQuestion={addNewQuestion} handleImageUpload={handleImageUpload} />)}
          </Stack>
        </Grid>

      )}

      {/* Step 3: Review & Submit */}
      {activeStep === 2 && (
        <Box mb={2}>
          <Typography variant="h5" fontWeight="bold">Review Quiz</Typography>

          {/* Quiz Details Table */}
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Difficulty</strong></TableCell>
                  <TableCell><strong>Passing Score (%)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{quizData.title}</TableCell>
                  <TableCell>{quizData.category}</TableCell>
                  <TableCell>{quizData.difficulty}</TableCell>
                  <TableCell>{quizData.passingScore}%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Questions Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Question No.</strong></TableCell>
                  <TableCell><strong>Question</strong></TableCell>
                  <TableCell><strong>Options</strong></TableCell>
                  <TableCell><strong>Correct Answer</strong></TableCell>
                  <TableCell><strong>Explanation</strong></TableCell>
                  <TableCell><strong>Time Limit (secs)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizData.questions.map((q, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{q.questionText}</TableCell>
                    <TableCell>
                      {q.options.map((opt, i) => (
                        <div key={i}>{i + 1}. {opt}</div>
                      ))}
                    </TableCell>
                    <TableCell style={{ color: "green" }}>{q.correctAnswer}</TableCell>
                    <TableCell>{q.explanation}</TableCell>
                    <TableCell style={{ color: "blue" }}>{q.timeLimit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Navigation Buttons */}
      {((activeStep >= 0) || (choose === (1 || 2 || 3))) && <Stack direction={'row'} mb={2} spacing={2} sx={{ width: '100%' }} >
        {activeStep > 0 && (
          <Button fullWidth color="primary" variant="outlined" onClick={handleBack} sx={{}}>
            Back
          </Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button fullWidth variant="contained" onClick={() => { handleNext(); setChoose(1) }}>
            Next
          </Button>
        ) : (
          <Button fullWidth variant="contained" color="success" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        )}
      </Stack>}
    </Box>
  );
};





const WithQuestion = ({ quizData, handleQuestionChange, addNewQuestion, handleImageUpload }) => {

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

  return (
    <>
      <Grid container>
        {quizData.questions.map((q, index) => (
          <Grid item key={index} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold">Question {index + 1}</Typography>
            <TextField fullWidth label="Question" value={q.questionText} onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)} sx={{ mb: 2 }} />
            {/* <Box sx={{ mt: 5, mb: 2, justifyContent: 'center' }}>
              <Typography variant="h6">Upload Blog Cover Image</Typography>
              <Button component="label"
                role={undefined}
                variant="contained"
                fullWidth
                sx={{ height: '10vh' }}
                tabIndex={-1}
                startIcon={<CloudUploadIcon />} >Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e)=>handleImageUpload(index,e)}
                  multiple
                />
                
              </Button>
              {q.image && (
                <Card sx={{ mt: 2, width: '300px' }}>
                  <CardMedia component="img" image={q.image} alt="Blog Cover" />
                  <CardContent><Typography>{q.image}</Typography></CardContent>
                </Card>
              )}
            </Box> */}
            {q.options.map((option, i) => (
              <TextField key={i} fullWidth label={`Option ${i + 1}`} value={option} onChange={(e) => {
                const newOptions = [...q.options];
                newOptions[i] = e.target.value;
                handleQuestionChange(index, "options", newOptions);
              }} sx={{ mb: 2 }} />
            ))}

            <TextField fullWidth label="Correct Answer" value={q.correctAnswer} onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="Explanation" value={q.explanation} onChange={(e) => handleQuestionChange(index, "explanation", e.target.value)} multiline rows={2} sx={{ mb: 2 }} />

            {/* New: Time Limit Field for Each Question */}
            <TextField fullWidth type="number" label="Time Limit (seconds)" value={q.timeLimit} onChange={(e) => handleQuestionChange(index, "timeLimit", e.target.value)} sx={{ mb: 2 }} />
          </Grid>
        ))}

        <Button variant="outlined" onClick={addNewQuestion} sx={{ mb: 2 }} fullWidth>
          Add Another Question
        </Button>
      </Grid>
    </>
  )

}
const ImageWithoutQuestion = ({ quizData, handleQuestionChange, addNewQuestion, handleImageUpload }) => {

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

  return (
    <>
      <Grid container>
        {quizData.questions.map((q, index) => (
          <Grid item key={index} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold">Question {index + 1}</Typography>
            {/* <TextField fullWidth label="Question" value={q.questionText} onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)} sx={{ mb: 2 }} /> */}
            <Box sx={{ mt: 2, mb: 2, justifyContent: 'center' }}>
              <Button component="label"
                role={undefined}
                variant="contained"
                fullWidth
                sx={{ height: '10vh' }}
                tabIndex={-1}
                startIcon={<CloudUploadIcon />} >Question Image
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => handleImageUpload(index, e)}
                  multiple
                />

              </Button>
              {q.image && (
                <Card sx={{ mt: 2, width: '300px' }}>
                  <CardMedia component="img" image={q.image} alt="Blog Cover" />
                  <CardContent><Typography>{q.image}</Typography></CardContent>
                </Card>
              )}
            </Box>
            {q.options.map((option, i) => (
              <TextField key={i} fullWidth label={`Option ${i + 1}`} value={option} onChange={(e) => {
                const newOptions = [...q.options];
                newOptions[i] = e.target.value;
                handleQuestionChange(index, "options", newOptions);
              }} sx={{ mb: 2 }} />
            ))}

            <TextField fullWidth label="Correct Answer" value={q.correctAnswer} onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="Explanation" value={q.explanation} onChange={(e) => handleQuestionChange(index, "explanation", e.target.value)} multiline rows={2} sx={{ mb: 2 }} />

            {/* New: Time Limit Field for Each Question */}
            <TextField fullWidth type="number" label="Time Limit (seconds)" value={q.timeLimit} onChange={(e) => handleQuestionChange(index, "timeLimit", e.target.value)} sx={{ mb: 2 }} />
          </Grid>
        ))}

        <Button variant="outlined" onClick={addNewQuestion} sx={{ mb: 2 }} fullWidth>
          Add Another Question
        </Button>
      </Grid>
    </>
  )

}
const ImageWithQuestion = ({ quizData, handleQuestionChange, addNewQuestion, handleImageUpload }) => {

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

  return (
    <>
      <Grid container>
        {quizData.questions.map((q, index) => (
          <Grid item key={index} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold">Question {index + 1}</Typography>
            <TextField fullWidth label="Question" value={q.questionText} onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)} sx={{ mb: 2 }} />
            <Box sx={{ mb: 2, justifyContent: 'center' }}>
              <Button component="label"
                role={undefined}
                variant="contained"
                fullWidth
                sx={{ height: '10vh' }}
                tabIndex={-1}
                startIcon={<CloudUploadIcon />} >Question Image
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => handleImageUpload(index, e)}
                  multiple
                />

              </Button>
              {q.image && (
                <Card sx={{ mt: 2, width: '300px' }}>
                  <CardMedia component="img" image={q.image} alt="Blog Cover" />
                  <CardContent><Typography>{q.image}</Typography></CardContent>
                </Card>
              )}
            </Box>
            {q.options.map((option, i) => (
              <TextField key={i} fullWidth label={`Option ${i + 1}`} value={option} onChange={(e) => {
                const newOptions = [...q.options];
                newOptions[i] = e.target.value;
                handleQuestionChange(index, "options", newOptions);
              }} sx={{ mb: 2 }} />
            ))}

            <TextField fullWidth label="Correct Answer" value={q.correctAnswer} onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)} sx={{ mb: 2 }} />
            <TextField fullWidth label="Explanation" value={q.explanation} onChange={(e) => handleQuestionChange(index, "explanation", e.target.value)} multiline rows={2} sx={{ mb: 2 }} />

            {/* New: Time Limit Field for Each Question */}
            <TextField fullWidth type="number" label="Time Limit (seconds)" value={q.timeLimit} onChange={(e) => handleQuestionChange(index, "timeLimit", e.target.value)} sx={{ mb: 2 }} />
          </Grid>
        ))}

        <Button variant="outlined" onClick={addNewQuestion} sx={{ mb: 2 }} fullWidth>
          Add Another Question
        </Button>
      </Grid>
    </>
  )

}

export default StandardQuizes;

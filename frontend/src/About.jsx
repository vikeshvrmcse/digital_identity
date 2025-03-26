import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Card, CardContent, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid2, Stack } from "@mui/material";
import { motion } from "framer-motion";
import Footer from "./Footer";
import pr from './assets/images/my_profile.jpg'
import pr1 from './assets/images/diploma.jpg'
import python from './assets/images/skill_images/python.png'
import java from './assets/images/skill_images/java.png'
import dart from './assets/images/skill_images/dart.jpg'
import flutter from './assets/images/skill_images/flutter.png'
import hcj from './assets/images/skill_images/html_css_js.png'
import mearn from './assets/images/skill_images/mearn.png'
import mysql from './assets/images/skill_images/mysql.png'
import ai_ml from './assets/images/skill_images/ai_ml.png'
import deep_learning from './assets/images/skill_images/deep_learning.png'
export default function About() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const profileData = [
    { label: "Name", value: "Vikesh Kumar Verma" },
    { label: "Branch", value: "Computer Science & Engineering" },
    { label: "Course", value: "B.Tech" },
    { label: "Year", value: "3rd Year" },
  ];

  const skills = [
    {
      "skill_title": "Basic-python",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": python
    },
    {
      "skill_title": "Basic-java",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": java
    },
    {
      "skill_title": "Basic-dart",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": dart
    },
    {
      "skill_title": "Basic-flutter",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": flutter
    },
    {
      "skill_title": "Basic-html, css, javascript",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": hcj
    },
    {
      "skill_title": "Mearn",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": mearn
    },
    {
      "skill_title": "Basic-AI-ML",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": ai_ml
    },
    {
      "skill_title": "Basic-Deep learning",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": deep_learning
    },
    {
      "skill_title": "Mysql",
      "description": "Python is easy to learn in my learning different programming language, and this is best for other skill learn helps, not confusing I'm prefer one programming for all problem solve. When learn python I'm getting how work data structure and what way to implement. This thought is describe my idea and gain other language skill.",
      "project": "Multi-suggestor, Voice over text conversion & vice-versa, Object-detection, File decoraton, Audio player. Library management system, Valid email identifire, Password crack using brute force method, Face detection.",
      "project_implementation_idea": "Purpose for learning how to work machine learning algorithm on real world data. When I'm thought how to work above project and make them then need something help me like college teacher, friends, and online plateform like stackover flow.",
      "image": mysql
    }
  ]

  return (


    <>
      <Box sx={{ width: "100%", minHeight: "100vh", textAlign: "center", py: 3 }}>
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography variant="h4" fontWeight="bold">About Me 🎓</Typography>
        </motion.div>

        {/* Tab Navigation */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Tabs value={tabIndex} onChange={handleChange} textColor="primary" indicatorColor="primary">
            <Tab label="Profile" />
            <Tab label="Academics" />
            <Tab label="Skills" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {tabIndex === 0 && (
            <motion.div key="profile" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} md={6}>
                  <Box component={'img'} src={pr} sx={{
                    width: 400, // Set fixed size for images
                    height: 400,
                    borderRadius: '50%', // Makes it circular
                    objectFit: 'cover', // Ensures the image fits inside circle
                    boxShadow: 3, // Adds slight shadow for styling
                  }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} sx={{ width: "90%", maxWidth: 500, mx: "auto", boxShadow: 3, p: 2,backgroundColor:"#FFF2D8", borderRadius: 8 }}>
                    <Typography variant="h5" align="center" fontWeight="bold" sx={{ mb: 2 }}>
                      Profile
                    </Typography>
                    <Table>
                      <TableBody>
                        {profileData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ fontWeight: "bold" }}>{row.label}</TableCell>
                            <TableCell>{row.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer></Grid>
              </Grid>
            </motion.div>
          )}

          {tabIndex === 1 && (
            <motion.div key="academics" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Paper
                elevation={3}
                sx={{
                  border: "1px solid grey",
                  borderRadius: 8,
                  padding: 3,
                  margin: {lg:8,xs:4,md:6},
                  backgroundColor:"#FFF2D8"
                }}
                
              >
                <Grid container alignItems="center" spacing={4} >
                  {/* Left Section - Card */}
                  <Grid item xs={12} md={6}>
                    <Card
                      sx={{
                        width: "90%",
                        maxWidth: 450,
                        mx: "auto",
                        p: 3,
                        border: "1px solid grey",
                        borderRadius: "10%",
                        boxShadow: 3,
                        backgroundColor:"#FFF2D8"
                      }}
                    >
                      <CardContent>
                        {[
                          { title: "Academics", content: "Details about academics, courses, and achievements. In college I'm very interested to take fevorite branch is computer science this is my soule. I'm very proud to give this branch." },
                          { title: "Internship", content: "Experience in internships and projects. In college I'm, understand the how to worked on real problem and multiple project experience thanks all teacher to help me." },
                          { title: "Subjects", content: "List of subjects covered in the course. In the academic session I was read multiple subjects like, Computer networking, cloud computing, Artificial inteligence with machine learning, Ananlysis and Design Algorithm, Data mining, Cyber security" },
                        ].map((section, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="h5" fontWeight="bold" color="primary">
                              {section.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{letterSpacing:"1px", textAlign:'justify'}}>
                              {section.content}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Right Section - Image */}
                  <Grid item xs={12} md={6} display="flex" justifyContent="center">
                    <Box
                      component="img"
                      src={pr1}
                      alt="Profile"
                      sx={{
                        width: 350,
                        height: 350,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid grey",
                        boxShadow: 3,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          )}

          {tabIndex === 2 && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%", display: "flex", justifyContent: "center" }} // ✅ Centers the Stack
            >
              <Stack
                direction="column"
                justifyContent="center"
                sx={{
                  width: "100%",
                  maxWidth: "90vw", // ✅ Responsive width
                  alignItems: "center",
                }}
              >
                {skills.map((item, index) => (
                  <Grid
                    key={index}
                    container
                    sx={{
                      boxShadow: 3,
                      borderRadius:10,
                      p: 4,
                      m: { xs: 2, md: 4 }, // ✅ Adjust margin on small screens
                      width: "100%",
                      maxWidth: "1100px" // ✅ Prevents too much stretching on large screens
                    }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* Left Content (Text) */}
                    <Grid
                      item
                      md={8} sm={12} xs={12}
                      sx={{
                        textAlign: "justify",
                        letterSpacing: "1.5px",
                        fontSize: { xs: "18px", md: "23px" }, // ✅ Adjust font size for mobile
                        px: { xs: 1, md: 2 } // ✅ Adds padding for small screens
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" textAlign="left">{item.skill_title}</Typography>
                      <Typography>{item.description}</Typography>

                      <Typography variant="h6" fontWeight="bold" textAlign="left">Projects</Typography>
                      <Typography>{item.project}</Typography>

                      <Typography variant="h6" fontWeight="bold" textAlign="left">Challenges and Output</Typography>
                      <Typography>{item.project_implementation_idea}</Typography>
                    </Grid>

                    {/* Right Content (Image) */}
                    <Grid
                      item
                      md={4} sm={12} xs={12}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: { xs: 2, md: 0 } // ✅ Adds space between text and image on small screens
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt="Profile"
                        sx={{
                          width:'300px',
                          height:'300px',
                          maxWidth: { xs: "350px", md: "350px" }, // ✅ Responsive image size
                          borderRadius: "50%",
                          objectFit: "contain",
                          border: "3px solid grey",
                          boxShadow: 3,
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
              </Stack>
            </motion.div>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

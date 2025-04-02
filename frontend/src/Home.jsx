import React from "react";
import { Box, Button, Typography, Grid, Card, CardContent, Divider, CardMedia, Chip, Link, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import AssistantIcon from '@mui/icons-material/Assistant';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SpaIcon from '@mui/icons-material/Spa';
import p3 from './assets/images/health_connect.webp'
import p2 from './assets/images/download_joy.webp'
import p1 from './assets/images/multi_suggestor.webp'
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import pr from './assets/images/my_profile.jpg'
import savita from './assets/images/savita_yadav.jpg'
import shreya from './assets/images/shreya_singh.jpg'
import amrita from './assets/images/amrita_singh.jpg'
import vabhav from './assets/images/vabhav_pandey.jpg'
export default function Home() {
    const navigate = useNavigate()
    const list = [
        { "id": 1, "name": "multi-suggestor", "image": p1, "icon": <AssistantIcon />, "skill": "Machine Learning, Flask, Python", "description": "Developed a recommendation engine that can be applied to e-commerce, content platforms, or personalized services, demonstrating my ability to use AI/ML techniques for business solutions." },
        { "id": 2, "name": "download-joy", "image": p2, "icon": <SubscriptionsIcon />, "skill": "Mobile Development with Flutter, API Integration, Backend with PHP", "description": "Built a social media platform, gaining experience in cross-platform mobile app development, API design, and integrating backend systems." },
        { "id": 3, "name": "health-connect", "image": p3, "icon": <SpaIcon />, "skill": "Full-Stack Development (React, Node.js, Express, MongoDB)", "description": "Developed a web application for health professionals and users to connect, providing experience in user authentication, scheduling systems, and real-time communication." }
    ]

    const person = {
        name: "Vikesh Kumar Verma",
        avatar: pr,
        skills: [
            { name: "Flutter", feedback: "Flutter helped me build a cross-platform app easily!" },
            { name: "Python & ML", feedback: "Machine Learning with Python is amazing for AI projects!" },
            { name: "Flask", feedback: "Flask made my API development smooth and fast!" },
            { name: "MySQL & MongoDB", feedback: "Using MySQL and MongoDB together gives flexibility in databases!" },
        ],
    };


    const testimonials = [
        {
            name: "Amrita singh",
            feedback: "Flutter helped me build a cross-platform app easily!",
            skill: "Flutter",
            avatar: amrita,
        },
        {
            name: "Vabhav pandey",
            feedback: "Machine Learning with Python is amazing for AI projects!",
            skill: "Python & ML",
            avatar: vabhav,
        },
        {
            name: "Shreya singh",
            feedback: "Flask made my API development smooth and fast!",
            skill: "Flask",
            avatar: shreya,
        },
        {
            name: "Savita yadav",
            feedback: "Using MySQL and MongoDB together gives flexibility in databases!",
            skill: "MySQL & MongoDB",
            avatar: savita,
        },
    ];
    return (
        <>
            <Box sx={{ width: "100%", textAlign: "center" }}>
                {/* Hero Section */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "50vh",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Typography
                            sx={{
                                display: { lg: "inline-flex", md: "flex", sm: "block" },
                                alignItems: "center",
                                fontWeight: "bold",
                            }}
                            variant="h3"
                            gutterBottom
                        >
                            Welcome to{" "}
                            <Typography
                                component="span"
                                color="accent"
                                sx={{ mx: 2, fontWeight: "bold", fontFamily: "Roboto", color: "primary", fontSize: "inherit" }}
                            >
                                Digital
                            </Typography>
                            <Typography
                                component="span"
                                
                                sx={{ fontWeight: "bold", fontFamily: "Roboto", fontSize: "inherit" }}
                            >
                                Identity
                            </Typography>
                        </Typography>


                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/signup')}
                            sx={{ mt: 2, fontSize: "18px", px: 4, py: 1 }}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </Box>

                {/* Cards Section */}
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 5, mb: 5 }}>
                    {list.map((index) => (
                        <Grid item key={index.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                            >
                                <Card sx={{ width: 300, boxShadow: 3, borderRadius: 3 }}>
                                    <CardMedia
                                        sx={{ height: 300 }}
                                        image={index.image}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography variant="h5" fontWeight="bold" textTransform={'uppercase'} mb={2}>
                                            <Chip icon={index.icon} sx={{ p: 4 }} label={index.name} />
                                        </Typography>
                                        <Divider m={8}>Skill</Divider>
                                        <Typography variant="body2" m={4}>
                                            {index.skill}
                                        </Typography>
                                        <Divider>application</Divider>
                                        <Typography variant="body2" color="textSecondary" m={2}>
                                            {index.description}.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems={'center'}
                    mb={3}
                >
                    {testimonials.map((testimonial, index) => (
                        <Grid
                            item
                            xs={12} sm={6} md={3}
                            key={index}
                            sx={{display:'flex', justifyContent: "center" }}
                        >
                            <Card sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
                                <Avatar src={testimonial.avatar} sx={{ width: 56, height: 56, margin: "auto", mt: 2 }} />
                                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                    <Typography variant="h6">{testimonial.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{testimonial.skill}</Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>{testimonial.feedback}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch" mt={7}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Avatar src={person.avatar} sx={{ width: 250, height: 250, margin: "auto" }} />
                        <Typography variant="h5" sx={{ mt: 2 }}>{person.name}</Typography>
                    </Grid>

                    {person.skills.map((skill, index) => (
                        <Grid
                            item xs={12} sm={6} md={3}
                            key={index}
                            sx={{ display: "flex", justifyContent: "center" }}
                            mb={3}

                        >
                            <Card sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
                                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                    <Typography variant="h6">{skill.name}</Typography>
                                    <Typography variant="body1" sx={{ mt: 1 }}>{skill.feedback}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Footer />

            </Box>

        </>
    );
}

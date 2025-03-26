import React from "react";
import { Box, Container, Typography, Grid, Link, Divider, Button, Stack, Icon,Avatar } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HackerRank from './assets/images/th.png'
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate=useNavigate()
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor:'#113946',
        color: "white",
        py: 3,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2" mb={3}>
              I'm software engineer, in college and internship work on many project like global fest, generative ai, and deep learning project. I'm self motivated and also dipressed. In current senerio not industries experience or any exprience except college project. I'm confident to work and reliable for provided work completed fully energy.
            </Typography>
            <Button variant="outlined" href="https://github.com/rushik008/B.Tech.-Computer-Science-Notes-Materials" color="secondary">Computer Science Materials</Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Button color="inherit" onClick={()=>navigate('/')}>Home</Button><br />
            <Button color="inherit" onClick={()=>navigate('/signup')}>Login</Button><br />
            <Button color="inherit" onClick={()=>navigate('/')} >Blogs</Button><br />
            <Button color="inherit" onClick={()=>navigate('/quize')}>Resume</Button><br />
            <Button color="inherit" onClick={()=>navigate('/about')}>Contact</Button>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Stack direction={'column'}>
              <Typography variant="h6" >Contact Us</Typography>
              <Button variant="outline" startIcon={<MailIcon/>} href="###vikeshkm@gmail.com">Email</Button>
              <Button variant="outline" startIcon={<PhoneInTalkIcon/>} href="###+91 9565649703##">Phone</Button>
              <Button variant="outline" startIcon={<GitHubIcon/>} href="###https://github.com/vikeshvrmcse">Github</Button>
              <Button variant="outline" startIcon={<LinkedInIcon/>} href="###https://www.linkedin.com/in/vikesh-kumar-verma-691a45218/">Linkdin</Button>
              <Button variant="outline" startIcon={<Avatar src={HackerRank} alt="Custom Icon" sx={{ width: 22, height: 22 }} />} href="###https://www.hackerrank.com/dashboard">Hcker Rank</Button>
            </Stack>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Divider color={'white'} />
          <Typography variant="body2" fontSize={16} mt={2}>

            &copy; {new Date().getFullYear()} fest.music@pleasure.in All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

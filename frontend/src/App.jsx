import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Blogs from "./Blogs";
import BlogDashboard from "./BlogDashboard";
import CustomThemeProvider from "./CustomThemeProvider"; // Import ThemeProvider
import { ContextProvider } from "./GlobalContext";
import StandardQuizes from "./StandardQuizes";
import QuizDashboard from "./QuizDashboard";
import QuizView from "./QuizView";
import QuizEdit from "./QuizEdit";
import BlogViewEdit from "./BlogViewEdit";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import NotFound from "./NotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated]=useState(false);
  const PrivateRouting = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  return (
    <CustomThemeProvider>
      <ContextProvider>
      <Router>
        <Navbar />
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<PrivateRouting element={<Home />}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/standardquiz" element={<StandardQuizes />} />
          <Route path="/quizdashboard" element={<QuizDashboard />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blogdashboard" element={<BlogDashboard />} />
          <Route path="/quizes/:quizId" element={<QuizView />} />
          <Route path="/quizes/edit/:quizId" element={<QuizEdit />} />
          <Route path="/blogs/view/:blogId" element={<BlogViewEdit />} />
          <Route path="/blogs/edit/:blogId" element={<BlogViewEdit />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </Router>
      
      </ContextProvider>
    </CustomThemeProvider>
  );
}

export default App;

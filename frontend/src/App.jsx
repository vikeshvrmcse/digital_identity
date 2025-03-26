import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Quize from "./Quize";
import Blogs from "./Blogs";
import BlogDashboard from "./BlogDashboard";
import CustomThemeProvider from "./CustomThemeProvider"; // Import ThemeProvider
import { ContextProvider } from "./GlobalContext";
import StandardQuizes from "./StandardQuizes";
import QuizDashboard from "./QuizDashboard";

function App() {
  return (
    <CustomThemeProvider>
      <ContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/quize" element={<Quize />} />
          <Route path="/standardquiz" element={<StandardQuizes />} />
          <Route path="/quizdashboard" element={<QuizDashboard />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blogdashboard" element={<BlogDashboard />} />
        </Routes>
      </Router>
      </ContextProvider>
    </CustomThemeProvider>
  );
}

export default App;

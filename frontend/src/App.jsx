import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Blogs from "./Blogs";
import BlogDashboard from "./BlogDashboard";
import CustomThemeProvider from "./CustomThemeProvider"; 
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Private Route Component
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  return (
    <CustomThemeProvider>
      <ContextProvider>
        <Router>
          <Navbar />
          <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes (Require Login) */}
            <Route path="/contact" element={<PrivateRoute element={<Contact />} />} />
            <Route path="/blog" element={<PrivateRoute element={<Blogs />} />} />
            <Route path="/standardquiz" element={<PrivateRoute element={<StandardQuizes />} />} />
            <Route path="/quizdashboard" element={<PrivateRoute element={<QuizDashboard />} />} />
            <Route path="/blogdashboard" element={<PrivateRoute element={<BlogDashboard />} />} />
            <Route path="/quizes/:quizId" element={<PrivateRoute element={<QuizView />} />} />
            <Route path="/quizes/edit/:quizId" element={<PrivateRoute element={<QuizEdit />} />} />
            <Route path="/blogs/view/:blogId" element={<PrivateRoute element={<BlogViewEdit />} />} />
            <Route path="/blogs/edit/:blogId" element={<PrivateRoute element={<BlogViewEdit />} />} />

            {/* 404 Page */}
            <Route path="/notfound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/notfound" replace />} />
          </Routes>
        </Router>
      </ContextProvider>
    </CustomThemeProvider>
  );
}

export default App;

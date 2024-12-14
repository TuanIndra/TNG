import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home_page/home";
import Editor from "./components/Editor/Editor";

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<HomePage />} />
  
          {/* Route for Editor Page */}
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
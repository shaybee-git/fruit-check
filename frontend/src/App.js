import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CheckFruit from "./pages/CheckFruit";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Authentication Checker
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Check if token exists
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="register" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="check-fruit" element={<ProtectedRoute><CheckFruit /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

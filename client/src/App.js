import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"; // Importing the PrivateRoute component
import Login from "./pages/login/Login"; // Importing the Login component
import Dashboard from "./pages/dashboard/Dashboard"; // Importing the Dashboard component
import Register from "./pages/register/Register"; // Importing the Register component
import "react-toastify/dist/ReactToastify.css";


// Define the App component
function App() {
  return (
    <Router> {/* Router component to manage navigation */}
      <Routes> {/* Routes component to define routes */}
        {/* Route for the default path, rendering the Dashboard component wrapped in PrivateRoute */}
        <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
        
        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for the dashboard page, rendering the Dashboard component wrapped in PrivateRoute */}
        <Route
          path="/dashboard"
          element={<PrivateRoute Component={Dashboard} />}
        />
        
        {/* Route for the registration page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App; // Exporting the App component

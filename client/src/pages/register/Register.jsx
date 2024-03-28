import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Register.scss"; // Importing styles
import { saveToken, saveUserData, toastMessage } from "../../utility/utlis"; // Importing utility function
import apiService from "../../service/apiService"; // Importing API service
import { ToastContainer } from "react-toastify";

export default function Register() {
  // State variables for form data, navigation, and error handling
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();


  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checking if passwords match
    if (formData.password !== formData.confirmPassword) {
      toastMessage("Passwords do not match.")
      return;
    }
    try {
      // Sending registration data to the backend API
      const { confirmPassword, ...dataToSend } = formData;
      const response = await apiService.userRegister(dataToSend);
      console.log(response)
      if (response.status === 200) {
        // If registration is successful, clear form data, reset error, save token, and navigate to dashboard
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          organization:"",
          password: "",
          confirmPassword: "",
        });
        saveToken(response.data.token);
        saveUserData(response.data.data)
        navigate("/dashboard");
      }
    } catch (error) {
      toastMessage(error.message)
      console.error("Registration failed:", error);
      // Handle error states accordingly
    }
  };

  return (
    <>
      {/* Navbar component */}
      <Navbar />
      {/* Register container */}
      <div className="register-container">
        <div className="register-card">
          {/* Login button */}
          <div className="login-button">
            <p>Already have an account?</p>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
          {/* Registration form */}
          <div className="register-form">
            <h2>Register</h2>
            {/* Form inputs */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} hideProgressBar={true} />

    </>
  );
}

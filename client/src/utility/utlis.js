import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying messages
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import {toast } from "react-toastify";

// Function to get the authentication token from localStorage
export const getToken = () => localStorage.getItem("token");

// Function to save the authentication token to localStorage
export const saveToken = (token) => localStorage.setItem("token", token);

// Function to clear the authentication token from localStorage
export const clearToken = () => localStorage.removeItem("token");

// Custom hook for displaying success messages using SweetAlert2
export const useSuccessMessage = () => {
  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  // Function to display a success message with SweetAlert2
  const showSuccessMessage = async (title, text) => {
    await Swal.fire({
      title: title,
      text: text,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/view"); // Redirect to the view page after confirmation
      }
    });
  };

  return { showSuccessMessage }; // Return function for showing success message
};

// Custom hook for displaying toast messages using toasifty
export const toastMessage = (message) => toast.error(message);

// Function to save API response data to localStorage
export const saveUserData = (data) => {
  const jsonData = JSON.stringify(data); // Convert data to JSON string
  localStorage.setItem("userData", jsonData); // Save JSON string to localStorage
}

// Function to retrieve API response data from localStorage
export const getUserData = () => {
  const jsonData = localStorage.getItem("userData"); // Retrieve JSON string from localStorage
  return JSON.parse(jsonData); // Parse JSON string back to object
}

// Function to remove API response data from localStorage
export const clearUserData = () => localStorage.removeItem("userData");

export const checkUserRole = () => {
  // Get user data
  const user = getUserData();

  // Check if user data exists and has a role property
  if (user  && user.role) {
    // Check if user role is "user"
    if (user.role === "user") {
      return "user"; // Return "user" if the role is "user"
    } else {
      return "admin"; // Return "admin" for any other role
    }
  } else {
    // Handle the case where user data or role is missing
    // You might want to throw an error, log a message, or handle it differently based on your application's requirements
    return "unknown"; // Return a default value, or handle the error as needed
  }
};





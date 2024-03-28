import React from "react";
import "./Navbar.scss"; // Importing the styles for the Navbar component
import { clearToken, clearUserData, getToken } from "../../utility/utlis"; // Importing utility functions for managing authentication tokens
import { useNavigate } from "react-router-dom"; // Importing hooks for navigation and accessing the current location
import { TbLogout2 } from "react-icons/tb"; // Importing an icon component for logout

// Defining the Navbar component as a functional component
export default function Navbar() {
  const navigate = useNavigate(); // Initializing the navigate function from useNavigate hook
  const token = getToken(); // Retrieving the authentication token

  // Function to handle logout
  const Logout = () => {
    clearToken(); // Clearing the authentication token
    clearUserData();
    navigate("/login"); // Navigating to the login page
  };

  // Rendering the Navbar component
  return (
    <div className="navbar"> {/* Navbar container */}
      <h2 className="navbar-title">Task</h2> {/* Navbar title */}
        {/* Rendering Logout button if there's a token */}
        {token && (
          <button className="navbar-button" onClick={Logout}>
            <TbLogout2 /> {/* Logout icon */}
          </button>
        )}
    </div>
  );
}

// Importing Axios for making HTTP requests and getToken function from utils for handling authentication token
import axios from 'axios';
import { getToken } from '../utility/utlis';
import { config } from '../config/static.data';

// Define the base URL for your API
const API_URL = config.URL; 
const loginEndpoint=config.loginEndpoint;
const registerEndpoint=config.registerEndpoint;
const organizationEndpoint=config.organizationEndpoint

// Creating an Axios instance with base URL and default headers
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', // Setting content type to JSON
  },
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.log(error.response)
      console.error("Unauthorized request. Redirecting to login page...");
    }
    return Promise.reject(error.response.data);
  }
);


// Define your API endpoints as methods of this service
const apiService = {
  // Method for user login
  userLogin: async (data) => {
    const response = await instance.post(loginEndpoint, data); // Making a POST request to '/login' endpoint with provided data
    return response; // Returning the response
  },

  // Method for user registration
  userRegister: async (data) => {
    const response = await instance.post(registerEndpoint, data); // Making a POST request to '/user' endpoint with provided data
    return response; // Returning the response
  },

  // Method for posting claims data
  getAllUserData: async () => {
    const response = await instance.get(organizationEndpoint, { // Making a get request to '/organization' endpoint with provided data and authentication token
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
    });
    return response.data; // Returning the data from the response
  },


  // Method for deleting claims data by ID
  deleteUserData: async (id) => {
    await instance.delete(`${organizationEndpoint}${id}`, { // Making a DELETE request to '/organization/:id' endpoint with provided ID and authentication token
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
    });
  },

  updateUserData:async(id,data)=>{
    await instance.put(`${organizationEndpoint}${id}`,data, { // Making a PUT request to '/organization/:id' endpoint with provided ID and authentication token
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      
    });
  }
};

export default apiService; // Exporting the API service

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() { // useState, useNavigate are hooks provided by React that allow us to manage state and navigate programmatically within our functional components, while axios is a popular library for making HTTP requests, and toast from react-hot-toast is used for displaying notifications to the user based on the success or failure of the login attempt
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate is used to easily navigate to different routes programmatically after successful login, allowing for a smoother user experience without needing to manually change the URL or refresh the page

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/login', { email, password }) // import.meta.env.VITE_BACKEND_URL is used to access the backend URL stored in the .env file, allowing for flexible configuration of the backend API endpoint without hardcoding it in the codebase
      .then(response => {
        toast.success('Login successful!');
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token); // Store the JWT token in local storage for future authenticated requests
        if(response.data.role === "admin") {
          navigate('/admin'); // Navigate to the admin page after successful login
        } else {
          navigate('/'); // Navigate to the home page for non-admin users
        }
      })
      .catch(error => {
        toast.error('Login failed. Please check your credentials and try again.');
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="w-full h-screen bg-[url('/login.png')] bg-center bg-cover flex justify-evenly items-center">
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Cosmetics Store</h1>
          <p className="text-xl">Discover Your Beauty</p>
        </div>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-lg flex flex-col justify-center items-center gap-6 p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Login</h2>
          
          <input 
            type="email"
            className="w-[300px] h-[50px] bg-gray-200 rounded-lg px-4 mb-4" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input 
            type="password"
            className="w-[300px] h-[50px] bg-gray-200 rounded-lg px-4 mb-4" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            onClick={handleLogin}
            className="w-[300px] h-[50px] bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-200"
          >
            Login
          </button>

          <p className="text-white text-center mt-4">
            Don't have an account? <a href="/signup" className="text-blue-400 hover:text-blue-300">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}
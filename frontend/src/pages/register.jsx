import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => { // handleRegister is a function that is called when the user clicks the "Register" button. It prevents the default form submission behavior, constructs a userData object with the input values, and sends a POST request to the backend API to create a new user account. If the registration is successful, it shows a success toast notification and navigates the user to the login page. If there is an error during registration, it shows an error toast notification with the appropriate message.
    e.preventDefault();
    
    const userData = { email, firstName, lastName, password };

    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/', userData)
      .then(response => {
        toast.success('Account created successfully!');
        navigate('/login'); // Redirect to login so they can sign in
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
        toast.error(errorMessage);
        console.error('Registration error:', error);
      });
  };

  return (
    <div className="w-full h-screen bg-[url('/login.png')] bg-center bg-cover flex justify-evenly items-center">
      {/* Left Side Branding */}
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Cosmetics Store</h1>
          <p className="text-xl">Join us and Discover Your Beauty</p>
        </div>
      </div>

      {/* Right Side Register Card */}
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[500px] min-h-[650px] backdrop-blur-md rounded-[20px] shadow-lg flex flex-col justify-center items-center gap-4 p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Create Account</h2>
          
          <input 
            type="text"
            className="w-[350px] h-[50px] bg-gray-200 rounded-lg px-4" 
            placeholder="First Name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input 
            type="text"
            className="w-[350px] h-[50px] bg-gray-200 rounded-lg px-4" 
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          
          <input 
            type="email"
            className="w-[350px] h-[50px] bg-gray-200 rounded-lg px-4" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input 
            type="password"
            className="w-[350px] h-[50px] bg-gray-200 rounded-lg px-4" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            onClick={handleRegister}
            className="w-[350px] h-[50px] mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-200"
          >
            Register
          </button>

          <p className="text-white text-center mt-4">
            Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 


function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const [signUpSuccess, setSignUpSuccess] = useState(false); 

  
  const handleChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    console.log(updatedFormData);
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', formData);
      console.log(response.data);
      setErrorMessage(''); 
      setSignUpSuccess(true); 
    } catch (error) {
      console.error("Error during sign up:", error);
      if (error.response && error.response.data) {
        console.log('Error message:', error.response.data.message); // Add this line
        setErrorMessage(error.response.data.message);
      } else {
        // Error message
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Sign Up</button>

      {signUpSuccess && <p>Sign up succeesful, <Link to="/login">Login here</Link>.</p>}

      {errorMessage && (
        <p className="error-message">
          {errorMessage}
          {errorMessage.includes('Username already exists') && (
            <span> <Link to="/login">Login here</Link>.</span>
          )}
        </p>
      )}

    </form>
  );
}

export default SignUp;

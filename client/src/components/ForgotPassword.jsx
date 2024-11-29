// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import './ForgotPassword.css';  // Add styles for the page

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    // Here, you can send a request to the backend to handle password reset
    try {
      const response = await fetch('https://userauthmern.onrender.com/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if(response){
        alert("Check your Email for password!")
      }
      const data = await response.json();

      if (data.message) {
        setMessage(data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    } catch (err) {
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit">Send Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;

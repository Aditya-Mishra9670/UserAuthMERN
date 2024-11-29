import React, { useState } from 'react';
import "./Signup.css";
import {Link, Navigate, useNavigate} from "react-router-dom";
const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://userauthmern.onrender.com/auth/signup", {
        method: "POST",
        // mode:'no-cors', 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ username, email, password }), 
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
        // alert(response.body.message);
      }
      navigate("/login");
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Sign Up</h2>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <div className="sign-up-container-items">
          <label htmlFor="username">UserName:</label>
          <input 
            type="text" 
            placeholder='Username' 
            value={username} // Bind input value to state
            onChange={(e) => setUserName(e.target.value)} 
          />
        </div>
        <div className="sign-up-container-items">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            autoComplete='off' 
            placeholder='Email' 
            value={email} // Bind input value to state
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="sign-up-container-items">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            placeholder='**********' 
            value={password} // Bind input value to state
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type='submit'>Sign Up</button>
        <p>Have an Account ?<Link to="/login">Login</Link> </p> 
      </form>
    </div>
  );
};

export default Signup;

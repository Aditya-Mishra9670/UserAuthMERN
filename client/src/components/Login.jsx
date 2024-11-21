import React, { useState } from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials:'include',
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials");
      }

      const data = await response.json();
      console.log(data);
      alert("Login Successful!");
      navigate("/dashboard")
    } catch (error) {
      console.error(error);
      alert("Login Failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form-item">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="login-form-item">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have Account ? <Link to ="/signup">Sign Up</Link></p>
        <Link to="/forgotPassword">Forgot Password</Link>
      </form>
    </div>
  );
};

export default Login;

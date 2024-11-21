// src/pages/Home.jsx
import React from 'react';
import './Home.css';  
import { Link } from 'react-router-dom';
import Login from './Login';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the default page of the application. Please log in or sign up to continue.</p>
      <Link to="/login" element ={<Login/>}>Login</Link>
    </div>
  );
};

export default Home;

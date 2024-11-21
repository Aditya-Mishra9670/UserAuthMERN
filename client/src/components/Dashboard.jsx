import React, { useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3000/auth/verify')
        .then(res=>{
            if(!res.data.status){
                navigate("/")
            }
        }).catch(err=>{
            console.log(err);
            navigate("/")
        });
    },[]);
    const handleLogout = () => {
      axios.get('http://localhost:3000/auth/logout', { withCredentials: true }) // Include credentials for cookie-based auth
          .then(res => {
              if (res.data.status) { 
                  navigate('/'); 
              } else {
                  console.log("Logout failed:", res.data.message);
              }
          })
          .catch(err => {
              console.error("Error during logout:", err);
          });
  };
  

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>My Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="widget">Widget 1</div>
        <div className="widget">Widget 2</div>
        <div className="widget">Widget 3</div>
      </div>
    </div>
  );
};

export default Dashboard;

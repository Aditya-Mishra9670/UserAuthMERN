import React, { useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

  const navigate = useNavigate();
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function myFunction() {    
    await sleep(50000); // 10000 milliseconds = 10 seconds    
  }
  
  // useEffect(() => {
  //   console.log("started fetching home page");
    
  //   axios.get('https://userauthmern.onrender.com/auth/verify', { withCredentials: true })
  //     .then(res => {
  //       if (!res.data.status) {
  //         navigate("/")
  //       }
  //     }).catch(err => {
  //       console.log(err);
  //       navigate("/")
  //     });
  // }, []);

  useEffect(() => {
    const checkTokenStatus = async () => {
      console.log("started fetching home page");
      await myFunction(); // Wait for the 50 seconds delay
  
      // Make the API request after the delay
      try {
        const res = await axios.get('https://userauthmern.onrender.com/auth/verify', { withCredentials: true });
        if (!res.data.status) {
          navigate("/"); // Redirect if the status is false
        }
      } catch (err) {
        console.log(err); // Log the error if any
        navigate("/"); // Redirect on error
      }
    };
  
    checkTokenStatus(); // Call the function to perform the action
  
  }, [navigate]); // Make sure the navigate function is in the dependency array
  
  const handleLogout = () => {
    axios.get('https://userauthmern.onrender.com/auth/logout', { withCredentials: true }) // Include credentials for cookie-based auth
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

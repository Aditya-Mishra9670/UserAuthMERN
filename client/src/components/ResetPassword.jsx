import React, { useState } from 'react';
import Axios from 'axios';
import './ResetPassword.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams(); // Token passed as a URL parameter
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (!password || !confirmPassword) {
            setError('Both password fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            const response = await Axios.post(`http://localhost:3000/auth/reset-password/${token}`, {
                newPassword: password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.status){
                navigate('/login');
            }
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again later.');
            setMessage('');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Your Password</h2>
            <form className="reset-password-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Change Password</button>
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ResetPassword;

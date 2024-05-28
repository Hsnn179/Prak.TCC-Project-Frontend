import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../middleware/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://reservasihotelbe-dot-e-02-415004.as.r.appspot.com/signin', {
                username,
                password
            });
            if (response.data.status === 'Success') {
                login(response.data.token, username);
                navigate('/dashboard');
            } else {
                alert(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Login failed!');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="title">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary" type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;

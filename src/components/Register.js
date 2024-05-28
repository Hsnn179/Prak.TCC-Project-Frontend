import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        RoleId: ''  // Tambahkan roleId ke form
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://reservasihotelbe-dot-e-02-415004.as.r.appspot.com/signup', formData);
            console.log(response);
            if (response.data.status === 'Success') {
                alert('Registration successful!');
                navigate('/signin');
            } else {
                alert(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="title">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Full Name</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Role ID</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            name="roleId"
                            value={formData.roleId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary" type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Perbaikan impor jwtDecode dengan destrukturisasi
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../middleware/AuthContext'; // Pastikan jalur ini benar
import ReservationForm from './ReservationForm';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { token, logout } = useContext(AuthContext);

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        (config) => {
            const currentDate = new Date();
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                logout();
                navigate('/');
                throw new axios.Cancel('Token expired, logging out.');
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const getRoomtypes = useCallback(async () => {
        const response = await axiosJWT.get('https://reservasihotelbe-dot-e-02-415004.as.r.appspot.com/api/roomtypes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }, [axiosJWT, token]);

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            getRoomtypes();
        }
    }, [token, navigate, getRoomtypes]);

    return (
        <div className="container mt-5">
            <h1 className="title">Welcome back!</h1>
            <button onClick={getRoomtypes} className="button is-info">Get Room Types</button>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReservationForm />
        </div>
    );
};

export default Dashboard;

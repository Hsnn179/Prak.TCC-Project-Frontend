import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationForm = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [formData, setFormData] = useState({
        nik: '',
        fullname: '',
        phone: '',
        email: '',
        checkin: '',
        days: '',
        roomId: ''
    });

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const response = await axios.get('https://reservasihotelbe-dot-e-02-415004.as.r.appspot.com/roomtypes');
                setRoomTypes(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRoomTypes();
    }, []);

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
            const response = await axios.post('https://reservasihotelbe-dot-e-02-415004.as.r.appspot.com/booking', formData);
            if (response.data.status === 'Success') {
                alert('Reservation successful!');
                setFormData({
                    nik: '',
                    fullname: '',
                    phone: '',
                    email: '',
                    checkin: '',
                    days: '',
                    roomId: ''
                });
            } else {
                alert('Reservation failed!');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred while making the reservation.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="title">Make a Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">NIK</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="nik"
                            value={formData.nik}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
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
                    <label className="label">Phone</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Check-in Date</label>
                    <div className="control">
                        <input
                            className="input"
                            type="date"
                            name="checkin"
                            value={formData.checkin}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Days</label>
                    <div className="control">
                        <input
                            className="input"
                            type="number"
                            name="days"
                            value={formData.days}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Room Type</label>
                    <div className="control">
                        <div className="select">
                            <select
                                name="roomId"
                                value={formData.roomId}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select room type</option>
                                {roomTypes.map(roomType => (
                                    <option key={roomType.id} value={roomType.id}>
                                        {roomType.name} - {roomType.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-primary" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;

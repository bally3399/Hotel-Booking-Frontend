// src/components/AvailableRooms.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AvailableRooms.module.css";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const AvailableRooms = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const hotelId = state?.hotelId;
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!hotelId) {
            setMessage("No Hotel ID provided.");
            return;
        }

        const fetchRooms = async () => {
            setLoading(true);
            setMessage("");

            const token = localStorage.getItem("token");
            if (!token) {
                setMessage("Unauthorized: No token found.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/v1/admin/hotel/${hotelId}/available`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const responseData = await response.json();
                if (response.status === 200 && responseData.success) {
                    setRooms(responseData.data || []);
                } else {
                    setMessage(responseData.message || "No available rooms found.");
                }
            } catch (error) {
                console.error("Error fetching available rooms:", error);
                setMessage("Failed to fetch available rooms.");
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [hotelId]);

    return (
        <main className={styles.container}>
            <div
                className={styles.backButton}
                onClick={() => navigate("/admin-dashboard")}
            >
                <HiArrowLeft className="mr-2" /> Back
            </div>
            <h2>Available Rooms</h2>
            {message && <p className={styles.message}>{message}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : rooms.length === 0 ? (
                <p>No available rooms found.</p>
            ) : (
                <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <div key={room.id} className={styles.roomCard}>
                            <h3>Room {room.id}</h3>
                            <p><strong>Type:</strong> {room.roomType}</p>
                            <p><strong>Price:</strong> ${room.price.toFixed(2)}</p>
                            <p><strong>Hotel:</strong> {room.hotel.name} (ID: {room.hotel.id})</p>
                            <p><strong>Location:</strong> {room.hotel.location}</p>
                            {room.pictureUrls && room.pictureUrls.length > 0 && (
                                <img
                                    src={room.pictureUrls[0]}
                                    alt={`Room ${room.id}`}
                                    className={styles.roomImage}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default AvailableRooms;
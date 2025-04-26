import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../availableRoom/AvailableRooms.module.css";
import { HiArrowLeft } from "react-icons/hi";

const AllRooms = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const rooms = state?.rooms || [];
    const [loading, setLoading] = useState({});

    const handleDeleteRoom = async (roomId) => {
        setLoading((prevLoading) => ({ ...prevLoading, [roomId]: true }));
        try {
            await axios.delete(
                `https://hotel-booking-management-backend.onrender.com/api/v1/rooms/${roomId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("Room deleted successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error deleting room:", error);
            toast.error("Failed to delete room. Please try again.");
        } finally {
            setLoading((prevLoading) => ({ ...prevLoading, [roomId]: false }));
        }
    };

    return (
        <main className={styles.container}>
            <div
                className={styles.backButton}
                onClick={() => navigate("/admin-dashboard")}
            >
                <HiArrowLeft className="mr-2" /> Back
            </div>

            <h2>All Rooms</h2>

            {rooms.length === 0 ? (
                <p>No rooms found.</p>
            ) : (
                <div className={styles.roomsGrid}>
                    {rooms.map((room, index) => (
                        <div
                            key={`${room.roomType}-${room.price}-${room.hotelId}-${index}`}
                            className={styles.roomCard}
                        >
                            <img
                                src={
                                    room.pictureUrls && room.pictureUrls.length > 0
                                        ? room.pictureUrls[0]
                                        : "https://via.placeholder.com/300x200?text=No+Image"
                                }
                                alt={`Room ${room.roomType}`}
                                className={styles.roomImage}
                            />

                            <div className={styles.roomDetails}>
                                <p><strong>Type:</strong> {room.roomType}</p>
                                <p><strong>Price:</strong> £{room.price}</p>
                                <p className={styles.available}>
                                    <strong>STATUS:</strong>{" "}
                                    {room.available ? "Available" : "Not Available"}
                                </p>
                                <button
                                    className={`bg-red-500 text-white py-2 px-4 rounded transition-colors ${
                                        loading[room.id]
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:bg-red-600"
                                    }`}
                                    onClick={() => handleDeleteRoom(room.id)}
                                    disabled={loading[room.id]}
                                >
                                    {loading[room.id] ? "Deleting..." : "Delete Room"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default AllRooms;
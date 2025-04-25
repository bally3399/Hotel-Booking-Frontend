import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AvailableRooms.module.css";
import { FaTv, FaPencilAlt, FaWifi } from "react-icons/fa"; // Icons for amenities

const AvailableRooms = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const rooms = state?.rooms || [];

    const handleBookRoom = (room) => {
        // Since hotelName is not in the API response, omit it from the message
        alert(`Booking room: ${room.roomType} for £${room.price}`);
        navigate("/book-room", { state: { room } });
    };

    return (
        <main className={styles.container}>
            <h2>Available Rooms</h2>
            {rooms.length === 0 ? (
                <p>No available rooms found.</p>
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
                                    <strong>AVAILABLE:</strong>{" "}
                                    {room.available ? "Available" : "Not Available"}
                                </p>
                                <button
                                    className={styles.bookButton}
                                    onClick={() => handleBookRoom(room)}
                                >
                                    Book Room
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default AvailableRooms;
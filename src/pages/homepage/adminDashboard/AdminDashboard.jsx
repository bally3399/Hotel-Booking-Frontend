import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi"; // Import the arrow icon

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFindAllHotels = async () => {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotels/all`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json();
            if (response.status === 200 && responseData.success) {
                const hotels = responseData.data || [];
                navigate("/hotels", { state: { hotels } });
            } else {
                alert(responseData.message || "Failed to fetch hotels.");
            }
        } catch (error) {
            console.error("Error fetching hotels:", error);
            alert("Failed to fetch hotels. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckRoomAvailability = async () => {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotel/available`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json();
            if (response.status === 200 && responseData.success) {
                const rooms = responseData.data || [];
                navigate("/available-rooms", { state: { rooms } });
            } else {
                alert(responseData.message || "Failed to fetch available rooms.");
            }
        } catch (error) {
            console.error("Error fetching available rooms:", error);
            alert("Failed to fetch available rooms. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div
                className={styles.backButton}
                onClick={() => navigate("/login")}
            >
                <HiArrowLeft className="mr-2" /> Back
            </div>

            <div className={styles.dashboard}>
                {loading && <div className={styles.loading}>Loading...</div>}

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/create-hotel")}
                        className={styles.actionButton}
                    >
                        Create Hotel
                    </button>
                    <button
                        onClick={() => navigate("/delete-room-by-id")}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Delete Room
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/get-hotels-by-location")}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Find Hotels By Location
                    </button>
                    <button
                        onClick={() => navigate("/add-room")}
                        className={styles.actionButton}
                    >
                        Add Room To Hotel
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/get-hotel-by-id")}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Find Hotel
                    </button>
                    <button
                        onClick={() => navigate("/delete-hotel-by-id")}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Delete Hotel
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={handleCheckRoomAvailability}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Available rooms
                    </button>
                    <button
                        onClick={handleFindAllHotels}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Find All Hotels
                    </button>
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
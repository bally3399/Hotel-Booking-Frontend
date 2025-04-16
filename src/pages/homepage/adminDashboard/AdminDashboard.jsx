import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { useState } from "react";

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

    return (
        <main>
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
                        Delete Room By Id
                    </button>
                    {/*<button*/}
                    {/*    onClick={() => navigate("/get-total-hotels-by-location")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*    disabled={loading}*/}
                    {/*>*/}
                    {/*    Total Hotels By Location*/}
                    {/*</button>*/}
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/get-hotels-by-location")}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Get Hotels By Location
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
                        Get Hotel By Id
                    </button>
                    <button
                        onClick={() => navigate("/delete-hotel-by-id")}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Delete Hotel By Id
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    {/*<button*/}
                    {/*    onClick={() => navigate("/view")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*>*/}
                    {/*    Get Most Booked Hotel By Location*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    onClick={() => navigate("/find-all-available-rooms")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*    disabled={loading}*/}
                    {/*>*/}
                    {/*    Find All Available Hotel Rooms*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    onClick={() => navigate("/deactivate-room-by-hotel-id")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*    disabled={loading}*/}
                    {/*>*/}
                    {/*    Deactivate Room By Hotel Id*/}
                    {/*</button>*/}
                </div>

                <div className={styles.buttonRow}>
                    {/*<button*/}
                    {/*    onClick={() => navigate("/activate-room-by-hotel-id")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*    disabled={loading}*/}
                    {/*>*/}
                    {/*    Activate Room By Hotel Id*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    onClick={() => navigate("/find-all-available-rooms")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*    disabled={loading}*/}
                    {/*>*/}
                    {/*    Find All Available Hotel Rooms*/}
                    {/*</button>*/}
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/check-room-availability")}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Check If Room Is Available
                    </button>
                    <button
                        onClick={handleFindAllHotels}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Find All Hotels
                    </button>
                    {/*<button*/}
                    {/*    onClick={() => navigate("/edit-room-by-id")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*>*/}
                    {/*    Edit Room By Id*/}
                    {/*</button>*/}
                </div>

                {/*<div className={styles.buttonRow}>*/}
                {/*    <button*/}
                {/*        onClick={() => navigate("/filter-by-price-and-location")}*/}
                {/*        className={styles.actionButton}*/}
                {/*        disabled={loading}*/}
                {/*    >*/}
                {/*        Filter By Price And Location*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        onClick={() => navigate("/filter-rooms-by-type")}*/}
                {/*        className={styles.actionButton}*/}
                {/*        disabled={loading}*/}
                {/*    >*/}
                {/*        Filter Hotel Room By Type*/}
                {/*    </button>*/}
                {/*</div>*/}

                <div className={styles.buttonRow}>
                    {/*<button*/}
                    {/*    onClick={handleFindAllHotels}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*    disabled={loading}*/}
                    {/*>*/}
                    {/*    Find All Hotels*/}
                    {/*</button>*/}
                    {/*<button*/}
                    {/*    onClick={() => navigate("/delete-room-by-id")}*/}
                    {/*    className={styles.actionButton}*/}
                    {/*    disabled={loading}*/}
                    {/*>*/}
                    {/*    Delete Room By Id*/}
                    {/*</button>*/}
                </div>
            </div>
        </main>
    );
};

export default AdminDashboard;
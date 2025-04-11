import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/navbar/Navbar";
import Footer from "../../../component/footer";
import styles from "./AdminDashboard.module.css";
import { useState } from "react";
import axios from 'axios';

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [state] = useState("new York");

    const getToken = () => localStorage.getItem("token");

    const getHotelsByLocation = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/hotels/state/${state}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                navigate("/roomDetails", { state: { hotels: response.data } });
            }
        } catch (error) {
            console.error("Error fetching hotels by location:", error);
        } finally {
            setLoading(false);
        }
    };

    const getHotelById = async () => {
        setLoading(true);
        const id = prompt("Please enter Hotel ID:");
        if (!id) return;
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/hotels/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                navigate("/rooms", { state: { hotel: response.data } });
            }
        } catch (error) {
            console.error("Error fetching hotel by ID:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteHotelById = async () => {
        setLoading(true);
        const id = prompt("Please enter Hotel ID to delete:");
        if (!id) return;
        try {
            const token = getToken();
            const response = await axios.delete(
                `${API_URL}/api/v1/admin/hotels/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200 || response.status === 204) {
                alert("Hotel deleted successfully");
                navigate("/rooms");
            }
        } catch (error) {
            console.error("Error deleting hotel:", error);
            alert("Failed to delete hotel");
        } finally {
            setLoading(false);
        }
    };

    const filterByPriceAndLocation = async () => {
        setLoading(true);
        const minPrice = prompt("Enter minimum price:");
        const maxPrice = prompt("Enter maximum price:");
        if (!minPrice || !maxPrice) return;
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/filter/price-and-state?minPrice=${minPrice}&maxPrice=${maxPrice}&location=${state}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                navigate("/filtered-results", { state: { filteredHotels: response.data } });
            }
        } catch (error) {
            console.error("Error filtering by price and location:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterHotelRoomByType = async () => {
        setLoading(true);
        const hotelId = prompt("Enter Hotel ID:");
        const type = prompt("Enter Room Type (e.g., SINGLE, DOUBLE):");
        if (!hotelId || !type) return;
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/hotel/${hotelId}/type/${type}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                navigate("/room-type-results", { state: { rooms: response.data } });
            }
        } catch (error) {
            console.error("Error filtering rooms by type:", error);
        } finally {
            setLoading(false);
        }
    };

    const deactivateRoomByHotelId = async () => {
        setLoading(true);
        const hotelId = prompt("Enter Hotel ID: ");
        const roomId = prompt("Enter Room ID to deactivate: ");
        if (!hotelId || !roomId) return;
        try {
            const token = getToken();
            const response = await axios.patch(
                `${API_URL}/api/v1/admin/hotel/${hotelId}/deactivate/${roomId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                alert("Room deactivated successfully");
                navigate("/de-activate");
            }
        } catch (error) {
            console.error("Error deactivating room:", error);
            alert("Failed to deactivate room");
        } finally {
            setLoading(false);
        }
    };

    const activateRoomByHotelId = async () => {
        setLoading(true);
        const hotelId = prompt("Enter Hotel ID:");
        const roomId = prompt("Enter Room ID to activate:");
        if (!hotelId || !roomId) return;
        try {
            const token = getToken();
            const response = await axios.patch(
                `${API_URL}/api/v1/admin/hotel/${hotelId}/activate/${roomId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                alert("Room activated successfully");
                navigate("/activate");
            }
        } catch (error) {
            console.error("Error activating room:", error);
            alert("Failed to activate room");
        } finally {
            setLoading(false);
        }
    };

    const findAllAvailableHotelRooms = async () => {
        setLoading(true);
        const hotelId = prompt("Enter Hotel ID:");
        if (!hotelId) return;
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/hotel/${hotelId}/available`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                navigate("/available-rooms", { state: { availableRooms: response.data } });
            }
        } catch (error) {
            console.error("Error finding available rooms:", error);
        } finally {
            setLoading(false);
        }
    };

    const checkIfRoomIsAvailable = async () => {
        setLoading(true);
        const roomId = prompt("Enter Room ID:");
        if (!roomId) return;
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/${roomId}/availability`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                alert(`Room availability: ${response.data.isAvailable ? "Yes" : "No"}`);
                navigate("/");
            }
        } catch (error) {
            console.error("Error checking room availability:", error);
        } finally {
            setLoading(false);
        }
    };

    const findAllRoomsForHotel = async () => {
        setLoading(true);
        const hotelId = prompt("Enter Hotel ID:");
        if (!hotelId) return;
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/hotel/${hotelId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                navigate("/rooms", { state: { rooms: response.data } });
            }
        } catch (error) {
            console.error("Error fetching all rooms for hotel:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteRoomById = async () => {
        setLoading(true);
        const roomId = prompt("Enter Room ID to delete:");
        if (!roomId) return;
        try {
            const token = getToken();
            const response = await axios.delete(
                `${API_URL}/api/v1/admin/${roomId}?state=${state}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200 || response.status === 204) {
                alert("Room deleted successfully");
                navigate("/rooms");
            }
        } catch (error) {
            console.error("Error deleting room:", error);
            alert("Failed to delete room");
        } finally {
            setLoading(false);
        }
    };

    const editRoomById = () => {
        const roomId = prompt("Enter Room ID to edit:");
        if (!roomId) return;
        navigate("/edit-room", { state: { roomId, state } });
    };

    const getTotalHotelsByLocation = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await axios.get(
                `${API_URL}/api/v1/admin/count?state=${state}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                navigate("/rooms", { state: { count: response.data } });
            }
        } catch (error) {
            console.error("Error fetching hotel count:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div className={styles.dashboard}>
                {loading && <div className={styles.loading}>Loading...</div>}

                <div className={styles.buttonRow}>
                    <button onClick={() => navigate("/create-hotel")} className={styles.actionButton}>
                        Create Hotel
                    </button>
                    <button onClick={getTotalHotelsByLocation} className={styles.actionButton} disabled={loading}>
                        Total Hotels By Location
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button onClick={getHotelsByLocation} className={styles.actionButton} disabled={loading}>
                        Get Hotel By Location
                    </button>
                    <button onClick={() => navigate("/add-room")} className={styles.actionButton}>
                        Add Room To Hotel
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button onClick={getHotelById} className={styles.actionButton} disabled={loading}>
                        Get Hotel By Id
                    </button>
                    <button onClick={deleteHotelById} className={styles.actionButton} disabled={loading}>
                        Delete Hotel By Id
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button onClick={() => navigate("/view")} className={styles.actionButton}>
                        Get Most Booked Hotel By Location
                    </button>
                    <button onClick={deactivateRoomByHotelId} className={styles.actionButton} disabled={loading}>
                        Deactivate Room By Hotel Id
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button onClick={activateRoomByHotelId} className={styles.actionButton} disabled={loading}>
                        Activate Room By Hotel Id
                    </button>
                    <button onClick={findAllAvailableHotelRooms} className={styles.actionButton} disabled={loading}>
                        Find All Available Hotel Rooms
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button onClick={checkIfRoomIsAvailable} className={styles.actionButton} disabled={loading}>
                        Check If Room Is Available
                    </button>
                    <button onClick={editRoomById} className={styles.actionButton}>
                        Edit Room By Id
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button onClick={filterByPriceAndLocation} className={styles.actionButton} disabled={loading}>
                        Filter By Price And Location
                    </button>
                    <button onClick={filterHotelRoomByType} className={styles.actionButton} disabled={loading}>
                        Filter Hotel Room By Type
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button onClick={findAllRoomsForHotel} className={styles.actionButton} disabled={loading}>
                        Find All Rooms For Hotel
                    </button>
                    <button onClick={deleteRoomById} className={styles.actionButton} disabled={loading}>
                        Delete Room By Id
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
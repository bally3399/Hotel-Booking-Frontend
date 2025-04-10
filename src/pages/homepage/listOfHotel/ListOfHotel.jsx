import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../component/navbar/Navbar";
import styles from "./ListOfHotel.module.css";
import Scroll from "../../../assets/scroll down.png";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9090"; // Consistent with your ListOfHotelPage

const ListOfHotelPage = () => {
    const navigate = useNavigate();
    const roomsRef = useRef(null);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [state, setState] = useState("new York"); // Default state

    useEffect(() => {
        fetchHotels();
    }, [state]);

    const fetchHotels = async () => {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized: Please login first");
            setLoading(false);
            navigate("/login"); // Redirect to login if no token
            return;
        }

        try {
            const response = await axios.get(
                `${API_URL}/api/v1/admin/count?state=${state}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success && response.data.data) {
                setHotels(response.data.data.hotels || [response.data.data]);
            } else {
                setHotels([]);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch hotels");
            setHotels([]);
        } finally {
            setLoading(false);
        }
    };

    const scrollToRooms = () => {
        if (roomsRef.current) {
            roomsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <main>
            {/*<Navbar />*/}
            <div className={styles.roomContainer}>
                <h1 className={styles.title}>Hotels and Rooms</h1>
                <p className={styles.subTitle}>
                    The elegant luxury bedrooms in this gallery showcase custom interior
                    designs & decorating ideas. View pictures and find your
                    perfect luxury bedroom design in the hotels.
                </p>
                <img
                    className={styles.image}
                    src={Scroll}
                    alt="Scroll down"
                    onClick={scrollToRooms}
                    style={{ cursor: "pointer" }}
                />
            </div>

            <div className={styles.hotelsSection} ref={roomsRef}>
                <div className={styles.backButton} onClick={() => navigate("/admin-dashboard")}>
                    <HiArrowLeft className="mr-2" /> Back
                </div>
                <h2>List of Hotels</h2>

                <div className={styles.filterSection}>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Enter state"
                        className={styles.stateInput}
                    />
                    <button
                        onClick={fetchHotels}
                        className={styles.refreshButton}
                        disabled={loading}
                    >
                        Refresh
                    </button>
                </div>

                {loading && <p className={styles.loading}>Loading...</p>}
                {error && <p className={styles.error}>{error}</p>}

                {!loading && !error && hotels.length === 0 && (
                    <p className={styles.noHotels}>No hotels found for state: {state}</p>
                )}

                {!loading && hotels.length > 0 && (
                    <div className={styles.hotelList}>
                        {hotels.map((hotel) => (
                            <div key={hotel.id || Math.random()} className={styles.hotelCard}>
                                <h3>{hotel.name || "Unnamed Hotel"}</h3>
                                <p><strong>State:</strong> {hotel.state || state}</p>
                                <p><strong>Location:</strong> {hotel.location || "N/A"}</p>
                                <p><strong>Description:</strong> {hotel.description || "No description"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default ListOfHotelPage;
import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/navbar/Navbar";
import Footer from "../../../component/footer";
import styles from "./AdminDashboard.module.css";
import { useState } from "react";
import axios from 'axios';

const API_URL = "http://localhost:9090";

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [state] = useState("new York");

    const getHotelsByState = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${API_URL}/api/v1/admin/hotels/state/${state}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                navigate("/roomDetails", { state: { hotels: response.data } });
            }
        } catch (error) {
            console.error("Error fetching hotels by state:", error);
        } finally {
            setLoading(false);
        }
    };

    const getHotelById = async () => {
        setLoading(true);
        const id = prompt("Please enter Hotel ID:");
        if (!id) return;

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${API_URL}/api/v1/admin/hotels/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
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

    return (
        <main>
            {/*<Navbar />*/}
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
                        onClick={() => navigate("/list")}
                        className={styles.actionButton}
                    >
                        List Of Hotel
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={getHotelsByState}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Get Hotel In State
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
                        onClick={getHotelById}
                        className={styles.actionButton}
                        disabled={loading}
                    >
                        Get Hotel By Id
                    </button>
                    <button
                        onClick={() => navigate("/rooms")}
                        className={styles.actionButton}
                    >
                        Delete Hotel By Id
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/view")}
                        className={styles.actionButton}
                    >
                        Get Most Booked Hotel In State
                    </button>
                    <button
                        onClick={() => navigate("/de-activate")}
                        className={styles.actionButton}
                    >
                        Deactivate Room By Hotel Id
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/activate")}
                        className={styles.actionButton}
                    >
                        Activate Room By Hotel Id
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.actionButton}
                    >
                        Find All Available Hotel Rooms
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.actionButton}
                    >
                        Check if Room Is Available
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.actionButton}
                    >
                        Edit Room By Id
                    </button>
                </div>

                <div className={styles.buttonRow}>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.actionButton}
                    >
                        Filter By Price And State
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className={styles.actionButton}
                    >
                        Filter Hotel Room By Type
                    </button>
                </div>
            </div>
            {/*<Footer />*/}
        </main>
    );
};

export default Dashboard;
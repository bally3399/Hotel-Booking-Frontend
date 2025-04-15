import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "./FindAllAvailableRoomsPage.module.css";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const FindAllAvailableRoomsPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ hotelId: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const inputStyles = {
        "& label.Mui-focused": { color: "#a47a47" },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "black" },
            "&:hover fieldset": { borderColor: "#a47a47" },
            "&.Mui-focused fieldset": { borderColor: "#a47a47" },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        if (!formData.hotelId) {
            setMessage("Please enter a Hotel ID.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotel/${formData.hotelId}/available`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                navigate("/available-rooms", { location: { availableRooms: data } });
            } else {
                setMessage("Failed to fetch available rooms.");
            }
        } catch (error) {
            console.error("Error fetching available rooms:", error);
            setMessage("Failed to fetch available rooms.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <div
                className={styles.backButton}
                onClick={() => navigate("/admin-dashboard")}
            >
                <HiArrowLeft className="mr-2" /> Back
            </div>
            <div className={styles.container}>
                <h2>Find All Available Rooms</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Hotel ID"
                        name="hotelId"
                        type="number"
                        value={formData.hotelId}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                        disabled={loading}
                    />
                    <div className={styles.submitButtonWrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            className={styles.submitButton}
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? "Fetching..." : "Find Available Rooms"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default FindAllAvailableRoomsPage;
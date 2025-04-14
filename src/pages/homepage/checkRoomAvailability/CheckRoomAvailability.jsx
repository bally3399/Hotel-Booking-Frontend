import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "../getHotelById/GetHotelById.module.css";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const CheckRoomAvailabilityPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ roomId: "" });
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

        if (!formData.roomId) {
            setMessage("Please enter a Room ID.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/v1/admin/${formData.roomId}/availability`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                const data = await response.json();
                alert(`Room availability: ${data ? "true" : "false"}`);
                navigate("/rooms");
            } else {
                setMessage("Failed to check availability.");
            }
        } catch (error) {
            console.error("Error checking availability:", error);
            setMessage("Failed to check availability.");
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
                <h2>Check If Room Is Available</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Room ID"
                        name="roomId"
                        type="number"
                        value={formData.roomId}
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
                            {loading ? "Fetching..." : "Get Hotel"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CheckRoomAvailabilityPage;
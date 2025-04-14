import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "../deactivateRoom/DeactivateRoomById.module.css";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const DeactivateRoomByHotelIdPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ hotelId: "", roomId: "" });
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

        if (!formData.hotelId || !formData.roomId) {
            setMessage("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotel/${formData.hotelId}/activate/${formData.roomId}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                setMessage("Room activated successfully!");
                setTimeout(() => navigate("/room"), 1000);
            } else {
                setMessage("Failed to deactivate room.");
            }
        } catch (error) {
            console.error("Error activating room:", error);
            setMessage("Failed to activate room.");
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
                <h2>Deactivate Room By Hotel ID</h2>
                {message && <p className={message.includes("successfully") ? styles.success : styles.message}>{message}</p>}
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
                            {loading ? "Activating..." : "Activate Room"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default DeactivateRoomByHotelIdPage;
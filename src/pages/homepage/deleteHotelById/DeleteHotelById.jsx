// src/components/DeleteHotelByIdPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "./DeleteHotelById.module.css";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const DeleteHotelByIdPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "" });
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

        if (!formData.name) {
            setMessage("Please enter a Hotel Name.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotels/${formData.name}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200 || response.status === 204) {
                setMessage("Hotel deleted successfully!");
                setTimeout(() => navigate("/rooms"), 1000);
            } else {
                setMessage("Failed to delete hotel.");
            }
        } catch (error) {
            console.error("Error deleting hotel:", error);
            setMessage("Failed to delete hotel.");
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
                <h2>Delete Hotel With Name</h2>
                {message && <p className={message.includes("successfully") ? styles.success : styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Hotel Name"
                        name="name"
                        type="text"
                        value={formData.name}
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
                            {loading ? "Deleting..." : "Delete Hotel"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default DeleteHotelByIdPage;
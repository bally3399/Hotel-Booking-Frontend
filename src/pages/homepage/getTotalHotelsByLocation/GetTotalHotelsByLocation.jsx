// src/components/GetTotalHotelsByLocationPage.js (Count Only)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "./GetTotalHotelsByLocation.module.css";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const GetTotalHotelsByLocationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ location: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalHotels, setTotalHotels] = useState(null);

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
        setTotalHotels(null);

        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
            setMessage("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        if (!formData.location.trim()) {
            setMessage("Please enter a location.");
            setLoading(false);
            return;
        }

        const location = formData.location.trim();
        console.log("Location:", location);
        try {
            const response = await fetch(`${API_URL}/api/v1/admin/count?location=${encodeURIComponent(location)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response status:", response.status);
            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (response.status === 200 && responseData.success) {
                setTotalHotels(responseData.data || 0);
            } else {
                setMessage(responseData.message || "No hotels found for this location.");
            }
        } catch (error) {
            console.error("Error fetching total hotels:", error);
            setMessage("Failed to fetch total hotels. Please try again.");
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
                <h2>Total Hotels By Location</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Location"
                        name="location"
                        value={formData.location}
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
                            {loading ? "Fetching..." : "Get Total Hotels"}
                        </Button>
                    </div>
                </form>
                {totalHotels !== null && (
                    <p className={styles.result}>
                        There {totalHotels === 1 ? "is" : "are"} <strong>{totalHotels}</strong> hotel{totalHotels !== 1 ? "s" : ""} in {formData.location}.
                    </p>
                )}
            </div>
        </main>
    );
};

export default GetTotalHotelsByLocationPage;
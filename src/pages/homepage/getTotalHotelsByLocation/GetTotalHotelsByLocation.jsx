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
    const [hotels, setHotels] = useState([]);
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
        setHotels([]);
        setTotalHotels(null);

        const token = localStorage.getItem("token");
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
        try {
            const hotelsResponse = await fetch(`${API_URL}/api/v1/admin/hotels?state=${encodeURIComponent(location)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Hotels response status:", hotelsResponse.status);
            const hotelsData = await hotelsResponse.json();
            console.log("Hotels response data:", hotelsData);

            if (!hotelsResponse.status === 200 || !hotelsData.success) {
                setMessage(hotelsData.message || "No hotels found for this location.");
                setLoading(false);
                return;
            }

            const countResponse = await fetch(`${API_URL}/api/v1/admin/count?state=${encodeURIComponent(location)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Count response status:", countResponse.status);
            const countData = await countResponse.json();
            console.log("Count response data:", countData);

            if (countResponse.status === 200 && countData.success) {
                setTotalHotels(countData.data || 0);
                setHotels(hotelsData.data || []);
            } else {
                setMessage(countData.message || "Failed to fetch hotel count.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("Failed to fetch hotels. Please try again.");
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
                <h2>Hotels By Location</h2>
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
                            {loading ? "Fetching..." : "Get Hotels"}
                        </Button>
                    </div>
                </form>
                {totalHotels !== null && (
                    <p className={styles.result}>
                        There {totalHotels === 1 ? "is" : "are"} <strong>{totalHotels}</strong> hotel{totalHotels !== 1 ? "s" : ""} in {formData.location}.
                    </p>
                )}
                {hotels.length > 0 && (
                    <div className={styles.hotelList}>
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className={styles.hotelCard}>
                                <h3>{hotel.name} (ID: {hotel.id})</h3>
                                <p><strong>Location:</strong> {hotel.location}</p>
                                <p><strong>Description:</strong> {hotel.description}</p>
                                <p><strong>Amenities:</strong> {hotel.amenities?.join(", ") || "None"}</p>
                                <p><strong>Rooms:</strong> {hotel.rooms?.length || 0} available</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default GetTotalHotelsByLocationPage;
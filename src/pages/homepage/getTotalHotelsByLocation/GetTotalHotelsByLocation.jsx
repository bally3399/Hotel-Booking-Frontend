// src/components/GetTotalHotelsByLocationPage.js (With Count)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "./GetTotalHotelsByLocation.module.css";
import { HiArrowLeft } from "react-icons/hi";
import ModalHotelCard from "../../../component/modal/modalHotelCard.jsx";
import Modal from "../../../component/modal/model.jsx";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const GetTotalHotelsByLocationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ location: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [totalHotels, setTotalHotels] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
        setHotels([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onClick = (hotelData) => {
        navigate("/hotel_details", { state: { hotelData } });
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
        console.log("Fetching hotels for location:", location);
        try {
            // Fetch hotel list
            const hotelsResponse = await fetch(`${API_URL}/api/v1/admin/hotels?location=${encodeURIComponent(location)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Hotels response status:", hotelsResponse.status);
            const hotelsData = await hotelsResponse.json();
            console.log("Hotels response data:", hotelsData);

            if (!hotelsResponse.ok) {
                setMessage(hotelsData.message || `Failed to fetch hotels (Status: ${hotelsResponse.status})`);
                setLoading(false);
                return;
            }

            // Fetch count (optional)
            const countResponse = await fetch(`${API_URL}/api/v1/admin/count?location=${encodeURIComponent(location)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Count response status:", countResponse.status);
            const countData = await countResponse.json();
            console.log("Count response data:", countData);

            if (countResponse.ok) {
                setTotalHotels(countData.data || 0);
                setHotels(hotelsData.data || []);
                setIsModalOpen(true);
            } else {
                setMessage(countData.message || `Failed to fetch hotel count (Status: ${countResponse.status})`);
                setHotels(hotelsData.data || []);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error fetching hotels:", error);
            setMessage("Failed to fetch hotels. Please check your connection or try again.");
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
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="max-h-120 overflow-y-auto w-full flex flex-wrap items-center justify-center">
                    {hotels.length === 0 ? (
                        <p className="text-center text-gray-600">No hotels found for this location.</p>
                    ) : (
                        hotels.map((hotel) => (
                            <ModalHotelCard key={hotel.id} data={hotel} onClick={() => onClick(hotel)} />
                        ))
                    )}
                </div>
            </Modal>
        </main>
    );
};

export default GetTotalHotelsByLocationPage;
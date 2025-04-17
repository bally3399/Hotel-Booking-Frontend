import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Autocomplete } from "@mui/material";
import styles from "../getHotelById/GetHotelById.module.css";
import { HiArrowLeft } from "react-icons/hi";
import Modal from "../../../component/modal/model.jsx";
import ModalHotelCard from "../../../component/modal/modalHotelCard.jsx";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const LOCATIONS = [
    "ABERDEEN",
    "BELFAST",
    "BIRMINGHAM",
    "BRIGHTON",
    "BRISTOL",
    "CAMBRIDGE",
    "CARDIFF",
    "DERRY",
    "DUNDEE",
    "EDINBURGH",
    "GLASGOW",
    "INVERNESS",
    "LEEDS",
    "LISBURN",
    "LIVERPOOL",
    "LONDON",
    "MANCHESTER",
    "NEWCASTLE_UPON_TYNE",
    "NEWPORT",
    "NOTTINGHAM",
    "OXFORD",
    "READING",
    "SHEFFIELD",
    "SOUTHAMPTON",
    "SWANSEA",
    "WREXHAM",
    "YORK",
];

const GetHotelsByLocationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ location: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (event, value) => {
        // Update formData with selected or typed value
        setFormData((prev) => ({ ...prev, location: value || "" }));
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

        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
            setMessage("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        if (!formData.location.trim()) {
            setMessage("Please enter or select a location.");
            setLoading(false);
            return;
        }

        const normalizedLocation = formData.location.trim().toUpperCase();
        console.log("Fetching hotels for location:", normalizedLocation);

        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotels/state/${encodeURIComponent(normalizedLocation)}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response status:", response.status);
            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (response.ok) {
                setHotels(responseData.data || []);
                setIsModalOpen(true);
            } else {
                setMessage(responseData.message || `Failed to fetch hotels (Status: ${response.status})`);
            }
        } catch (error) {
            console.error("Error fetching hotels by location:", error);
            setMessage("Failed to fetch hotels. Please check your connection or try again.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHotels([]);
    };

    const onClick = (hotelData) => {
        navigate("/hotel_details", { state: { hotelData } });
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
                <h2>Get Hotels By Location</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <Autocomplete
                        freeSolo
                        options={LOCATIONS}
                        value={formData.location}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Location"
                                name="location"
                                fullWidth
                                required
                                margin="normal"
                                sx={inputStyles}
                                disabled={loading}
                            />
                        )}
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
            </div>

            {/* Modal to Display Fetched Hotels */}
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

export default GetHotelsByLocationPage;
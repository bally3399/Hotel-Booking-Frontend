import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "./GetHotelById.module.css";
import { HiArrowLeft } from "react-icons/hi";
import ModalHotelCard from "../../../component/modal/modalHotelCard.jsx";
import Modal from "../../../component/modal/model.jsx";
import axios from "axios";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const GetHotelByIdPage = () => {
    const navigate = useNavigate();
    const [hotelName, setHotelName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hotel, setHotel] = useState(null);

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
        setHotel(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        const normalizedQuery = hotelName.trim().toUpperCase();
        if (!normalizedQuery) {
            setMessage("Please enter a Hotel Name.");
            setLoading(false);
            return;
        }

        try {
            const url = `${API_URL}/api/v1/hotel/${encodeURIComponent(normalizedQuery)}`;
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data.data;
            const normalizedResults = Array.isArray(data) ? data[0] : data;

            if (response.status === 200 && normalizedResults) {
                setHotel(normalizedResults);
                setIsModalOpen(true);
                setMessage("");
            } else {
                setMessage("No hotel found with that name");
            }
        } catch (error) {
            console.error("Search error:", error);
            setMessage(
                error.response?.data.message ||
                "Failed to fetch hotel. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleHotelClick = (hotelData) => {
        navigate("/hotel_details", { state: { hotelData } });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setHotel(null);
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
                <h2>Get Hotel By Name</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Hotel Name"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="max-h-120 overflow-y-auto w-full flex flex-wrap items-center justify-center">
                    {hotel ? (
                        <ModalHotelCard
                            data={hotel}
                            onClick={() => handleHotelClick(hotel)}
                        />
                    ) : (
                        <p className="text-center text-gray-600">No hotel found.</p>
                    )}
                </div>
            </Modal>
        </main>
    );
};

export default GetHotelByIdPage;
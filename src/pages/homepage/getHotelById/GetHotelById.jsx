// src/components/GetHotelByIdPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "./GetHotelById.module.css";
import { HiArrowLeft } from "react-icons/hi";
import ModalHotelCard from "../../../component/modal/modalHotelCard.jsx";
import Modal from "../../../component/modal/model.jsx";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const GetHotelByIdPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ id: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hotel, setHotel] = useState(null); // Single hotel, not array

    const closeModal = () => {
        setIsModalOpen(false);
        setHotel(null);
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
        setHotel(null);

        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
            setMessage("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        if (!formData.id.trim()) {
            setMessage("Please enter a Hotel ID.");
            setLoading(false);
            return;
        }

        const hotelId = formData.id.trim();
        console.log("Fetching hotel ID:", hotelId);
        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotels/${hotelId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response status:", response.status);
            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (response.ok) {
                setHotel(responseData.data || null);
                setIsModalOpen(true);
            } else {
                setMessage(responseData.message || `Failed to fetch hotel (Status: ${response.status})`);
            }
        } catch (error) {
            console.error("Error fetching hotel by ID:", error);
            setMessage("Failed to fetch hotel. Please check your connection or try again.");
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
                <h2>Get Hotel By ID</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Hotel ID"
                        name="id"
                        type="number"
                        value={formData.id}
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="max-h-120 overflow-y-auto w-full flex flex-wrap items-center justify-center">
                    {hotel ? (
                        <ModalHotelCard data={hotel} onClick={() => onClick(hotel)} />
                    ) : (
                        <p className="text-center text-gray-600">No hotel found.</p>
                    )}
                </div>
            </Modal>
        </main>
    );
};

export default GetHotelByIdPage;
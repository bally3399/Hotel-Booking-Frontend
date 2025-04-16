
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "../getHotelById/GetHotelById.module.css";
import { HiArrowLeft } from "react-icons/hi";


import Modal from "../../../component/modal/model.jsx"
import ModalHotelCard from "../../../component/modal/modalHotelCard.jsx";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const GetHotelsByLocationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ location: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

        if (!formData.location) {
            setMessage("Please enter a state.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/v1/admin/hotels/state/${formData.location}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                const data = await response.json();
                setHotels(data.data || []);
                setIsModalOpen(true);
            } else {
                setMessage("Failed to fetch hotels.");
            }
        } catch (error) {
            console.error("Error fetching hotels by location:", error);
            setMessage("Failed to fetch hotels.");
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onClick = (hotelData) => {
        navigate("/hotel_details", { state: { hotelData: hotelData } });
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
            </div>

            {/* Modal to Display Fetched Hotels */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="max-h-120 overflow-y-auto w-full flex flex-wrap items-center justify-center ">
                    {hotels.length === 0 ? (
                        <p className="text-center text-gray-600">No hotels found for this location.</p>
                    ) : (
                        hotels.map((hotel) => (
                            <ModalHotelCard data={hotel} onClick={() => onClick(hotel)} />
                        ))
                    )}
                </div>
            </Modal>
        </main>
    );
};

export default GetHotelsByLocationPage;
import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem } from "@mui/material";
import styles from "./Addroom.module.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const AddRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const hotelIdFromState = location.state?.hotel?.id || 0;

    const [roomData, setRoomData] = useState({
        roomType: "SINGLE",
        price: "",
        isAvailable: false,
        hotelId: hotelIdFromState,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prev => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || "" : value
        }));
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

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Unauthorized: No token found.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.role !== "Admin") {
                setMessage("Unauthorized: Only admins can add rooms.");
                return;
            }
        } catch (error) {
            setMessage("Invalid token.");
            return;
        }

        const payload = {
            roomType: roomData.roomType,
            price: roomData.price ? { amount: roomData.price } : {},
            isAvailable: roomData.isAvailable === "true",
            hotelId: parseInt(roomData.hotelId),
        };

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/admin/add_room`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                    },
                }
            );

            setMessage("Room added successfully!");
            setRoomData({
                roomType: "SINGLE",
                price: "",
                isAvailable: false,
                hotelId: hotelIdFromState,
            });
            navigate("/rooms");
        } catch (error) {
            setMessage(`Failed to add room: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <main>
            <div
                className={styles.backButton}
                onClick={() => navigate("/admin-dashboard")}
            >
                <HiArrowLeft className="mr-2"/> Back
            </div>
            <div className={styles.addRoomContainer}>
                <h2>Add a New Room</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Room Type"
                        name="roomType"
                        value={roomData.roomType}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                    >
                        <MenuItem value="SINGLE">Single</MenuItem>
                        <MenuItem value="DOUBLE">Double</MenuItem>
                        <MenuItem value="SUITE">Suite</MenuItem>
                        <MenuItem value="DELUXE">Deluxe</MenuItem>
                    </TextField>
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={roomData.price}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                        inputProps={{ step: "100.00" }}
                    />
                    <TextField
                        select
                        label="Availability"
                        name="isAvailable"
                        value={roomData.isAvailable}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                    >
                        <MenuItem value="true">Available</MenuItem>
                        <MenuItem value="false">Not Available</MenuItem>
                    </TextField>
                    <TextField
                        label="Hotel ID"
                        name="hotelId"
                        type="number"
                        value={roomData.hotelId}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                    />
                    <div className={styles.submitButtonWrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            className={styles.submitButton}
                            fullWidth
                        >
                            Add Room
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddRoom;
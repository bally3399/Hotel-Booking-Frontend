import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import styles from "./CreateHotel.module.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const CreateHotel = () => {
    const [hotelData, setHotelData] = useState({
        name: "",
        location: "",
        description: "",
        amenities: "",
        pictures: [],
    });

    const [message, setMessage] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotelData(prev => ({ ...prev, [name]: value }));
    };

    const handlePictureUrlChange = (e) => {
        setPictureUrl(e.target.value);
    };

    const addPictureUrl = () => {
        if (pictureUrl.trim()) {
            setHotelData(prev => ({
                ...prev,
                pictures: [...prev.pictures, pictureUrl.trim()]
            }));
            setPictureUrl("");
        }
    };

    const removePictureUrl = (index) => {
        setHotelData(prev => ({
            ...prev,
            pictures: prev.pictures.filter((_, i) => i !== index)
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
                setMessage("Unauthorized: Only admins can add hotels.");
                return;
            }
        } catch (error) {
            setMessage("Invalid token.");
            return;
        }

        const payload = {
            name: hotelData.name,
            location: hotelData.location,
            description: hotelData.description,
            amenities: hotelData.amenities.split(",").map(item => item.trim()),
            pictures: hotelData.pictures,
        };

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/admin/hotels`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                    },
                }
            );

            setMessage("Hotel added successfully!");
            setHotelData({
                name: "",
                location: "",
                description: "",
                amenities: "",
                pictures: [],
            });
            navigate("/hotels");
        } catch (error) {
            setMessage(`Failed to add hotel: ${error.response?.data?.message || error.message}`);
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
            <div className={styles.createHotelContainer}>
                <h2>Add a New Hotel</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={hotelData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                    />

                    <TextField
                        label="Location"
                        name="location"
                        value={hotelData.location}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={hotelData.description}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                    />
                    <TextField
                        label="Amenities (comma-separated)"
                        name="amenities"
                        value={hotelData.amenities}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                        helperText="Example: wifi, pool, parking"
                    />
                    <div className={styles.pictureSection}>
                        <TextField
                            label="Picture URL"
                            value={pictureUrl}
                            onChange={handlePictureUrlChange}
                            fullWidth
                            margin="normal"
                            sx={inputStyles}
                        />
                        <Button
                            variant="outlined"
                            onClick={addPictureUrl}
                            className={styles.addPictureButton}
                        >
                            Add
                        </Button>
                    </div>
                    {hotelData.pictures.length > 0 && (
                        <div className={styles.pictureList}>
                            <h4>Added Pictures:</h4>
                            <ul>
                                {hotelData.pictures.map((url, index) => (
                                    <li key={index} className={styles.pictureItem}>
                                        {url}
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => removePictureUrl(index)}
                                        >
                                            Remove
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className={styles.submitButtonWrapper}>
                        <Button
                            type="submit"
                            variant="contained"
                            className={styles.submitButton}
                            fullWidth
                        >
                            Add Hotel
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateHotel;
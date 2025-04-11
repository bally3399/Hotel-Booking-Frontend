import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import styles from "./Addroom.module.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const AddRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const hotelIdFromState = location.state?.hotel?.id;

    const [roomData, setRoomData] = useState({
        roomType: "SINGLE",
        price: "",
        isAvailable: "NOT AVAILABLE",
        hotelId: hotelIdFromState || "",
        pictures: [],
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Cloudinary Upload Widget setup
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;
        script.onload = () => {
            if (!window.cloudinary) {
                setMessage("Failed to load Cloudinary widget. Please try again later.");
                return;
            }
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget(
                {
                    cloudName: "dsd8rgdju",
                    uploadPreset: "hotel_upload_preset",
                    sources: ["local"],
                    multiple: true,
                    maxFiles: 5,
                },
                (error, result) => {
                    if (error) {
                        console.error("Upload error:", error);
                        setMessage(`Failed to upload image: ${error.message || "Unknown error"}`);
                        setUploading(false);
                        return;
                    }
                    if (result.event === "queues-start") {
                        setUploading(true);
                    }
                    if (result.event === "queues-end") {
                        setUploading(false);
                    }
                    if (result && result.event === "success") {
                        setRoomData(prev => ({
                            ...prev,
                            pictures: [...prev.pictures, result.info.secure_url],
                        }));
                    }
                }
            );
        };
        script.onerror = () => {
            setMessage("Failed to load Cloudinary script. Please check your internet connection.");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prev => ({
            ...prev,
            [name]:
                name === "price"
                    ? value === ""
                        ? ""
                        : parseFloat(value) >= 0
                            ? parseFloat(value)
                            : prev.price
                    : value,
        }));
    };

    const removePicture = (index) => {
        setRoomData(prev => ({
            ...prev,
            pictures: prev.pictures.filter((_, i) => i !== index),
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
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Unauthorized: No token found.");
            setLoading(false);
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.roles[0] !== "ADMIN") {
                setMessage("Unauthorized: Only admins can add rooms.");
                setLoading(false);
                return;
            }
        } catch (error) {
            setMessage("Invalid token.");
            setLoading(false);
            return;
        }

        const payload = {
            roomType: roomData.roomType,
            price: roomData.price ? parseFloat(roomData.price) : 0,
            isAvailable: roomData.isAvailable === "AVAILABLE",
            hotelId: parseInt(roomData.hotelId),
            pictures: Array.isArray(roomData.pictures) ? roomData.pictures : [],
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
                isAvailable: "NOT AVAILABLE",
                hotelId: hotelIdFromState,
                pictures: [],
            });
            navigate("/rooms");
        } catch (error) {
            setMessage(`Failed to add room: ${error.response?.data?.message || error.message}`);
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
                        inputProps={{ step: "100.00", min: "0" }}
                    />
                    <FormControl fullWidth margin="normal" sx={inputStyles}>
                        <InputLabel>Availability</InputLabel>
                        <Select
                            name="isAvailable"
                            value={roomData.isAvailable}
                            onChange={handleChange}
                            label="Availability"
                            required
                        >
                            <MenuItem value="AVAILABLE">Available</MenuItem>
                            <MenuItem value="NOT AVAILABLE">Not Available</MenuItem>
                        </Select>
                    </FormControl>
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
                    <div className={styles.pictureSection}>
                        <Button
                            variant="outlined"
                            onClick={() => widgetRef.current?.open()}
                            className={styles.addPictureButton}
                            disabled={uploading || loading}
                        >
                            {uploading ? "Uploading..." : "Upload Pictures"}
                        </Button>
                    </div>
                    {roomData.pictures.length > 0 && (
                        <div className={styles.pictureList}>
                            <h4>Uploaded Pictures:</h4>
                            <ul>
                                {roomData.pictures.map((url, index) => (
                                    <li key={index} className={styles.pictureItem}>
                                        <img
                                            src={url}
                                            alt={`Uploaded ${index}`}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => removePicture(index)}
                                            disabled={loading}
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
                            disabled={loading || uploading}
                        >
                            {loading ? "Adding Room..." : "Add Room"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AddRoom;
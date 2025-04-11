import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import styles from "./CreateHotel.module.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

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
    "YORK"
];

const CreateHotel = () => {
    const [hotelData, setHotelData] = useState({
        name: "",
        location: "",
        description: "",
        amenities: "",
        pictures: [],
    });

    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

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
                    uploadPreset: "hotel_upload_preset", // Ensure this matches your Cloudinary preset
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
                        setHotelData(prev => ({
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
        setHotelData(prev => ({ ...prev, [name]: value }));
    };

    const removePictureUrl = (index) => {
        setHotelData(prev => ({
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

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("Unauthorized: No token found.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.roles[0] !== "ADMIN") {
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
                <HiArrowLeft className="mr-2" /> Back
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
                    <FormControl fullWidth margin="normal" sx={inputStyles}>
                        <InputLabel>Location</InputLabel>
                        <Select
                            name="location"
                            value={hotelData.location}
                            onChange={handleChange}
                            label="Location"
                            required
                        >
                            <MenuItem value="">
                                <em>Select a location</em>
                            </MenuItem>
                            {LOCATIONS.map((location) => (
                                <MenuItem key={location} value={location}>
                                    {location.replace(/_/g, " ")}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                        <Button
                            variant="outlined"
                            onClick={() => widgetRef.current?.open()}
                            className={styles.addPictureButton}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Upload Pictures"}
                        </Button>
                    </div>
                    {hotelData.pictures.length > 0 && (
                        <div className={styles.pictureList}>
                            <h4>Uploaded Pictures:</h4>
                            <ul>
                                {hotelData.pictures.map((url, index) => (
                                    <li key={index} className={styles.pictureItem}>
                                        <img
                                            src={url}
                                            alt={`Uploaded ${index}`}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
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
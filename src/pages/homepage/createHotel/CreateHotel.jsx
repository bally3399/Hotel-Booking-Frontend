import React, { useState, useRef } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import styles from "./CreateHotel.module.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {HiArrowLeft} from "react-icons/hi";

const API_URL = "http://hotel-api.fortunaelibrary-api.com/api";

const CreateHotel = () => {
    const [roomData, setRoomData] = useState({
        name: "",
        state: "",
        location: "",
        description: "",
        amenities: "",
        picture: [],
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };

    const handleFileChange = (e) => {
        setRoomData({ ...roomData, picture: Array.from(e.target.files) });
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

        const formData = new FormData();
        formData.append("name", roomData.name);
        formData.append("state", roomData.state);
        formData.append("location", roomData.location);
        formData.append("description", roomData.description);
        formData.append("amenities", roomData.amenities);

        roomData.picture.forEach((file) => {
            formData.append("picture", file);
        });

        try {
            const response = await axios.post(
                `${API_URL}/v1/hotel/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                    },
                }
            );
            console.log("Hotel added:", response.data);
            setMessage("Hotel added successfully!");

            setRoomData({
                name: "",
                state: "",
                location: "",
                description: "",
                amenities: "",
                picture: [],
            });

            navigate("/rooms");
        } catch (error) {
            setMessage("Failed to add hotel. Try again.");
        }
    };

    return (
        <main>
            <div className={styles.backButton} onClick={() => navigate("/admin-dashboard")}>
                <HiArrowLeft className="mr-2"/> Back
            </div>
    <div className={styles.createHotelContainer}>
        <h2>Add a new Hotel</h2>
        {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={roomData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="State"
                    name="state"
                    value={roomData.state}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Location"
                    name="location"
                    value={roomData.location}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={roomData.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Amenities"
                    name="amenities"
                    value={roomData.amenities}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                    required
                    className={styles.fileInput}
                    ref={fileInputRef}
                />
                <div className={styles.submitButtonWrapper}>
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.submitButton}
                        fullWidth
                    >
                        Create Hotel
                    </Button>
                </div>
            </form>
        </div>
        </main>
    );
};

export default CreateHotel;

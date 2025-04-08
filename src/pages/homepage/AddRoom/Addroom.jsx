import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../AddRoom/Addroom.module.css";


const AddRoom = () => {
    const [roomDetails, setRoomDetails] = useState({
        roomType: "SUITE",
        price: 200.00,
        available: false,
        hotelId: 1
    });

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
         const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbl9zdGV2ZSIsInJvbGVzIjpbIlJPTEVfUk9MRV9BRE1JTiJdLCJpYXQiOjE3NDEwMjIwMjIsImV4cCI6MTc0MTAzOTg4OX0.tU44OuaHMwFRGw71B1j8NuUZhj6u8CxR-o2vzznK0enUp8PALJfOeovosTWnoNHDFKJGPmXdabES2KK1iraJoQ"
        try {
            const response = await axios.post("http://api.fortunaehotel.com/api/v1/rooms", roomDetails, {
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                toast.success("Room added successfully!", { position: "top-right", autoClose: 3000 });
                navigate("/rooms");
            } else {
                toast.error("Failed to add room. Try again.");
            }
        } catch (error) {
            toast.error("Error adding room. Please try again.");
        } finally {
            setIsLoading(false);
            navigate("/rooms");

        }
    };

    return (
        <Container maxWidth="sm" className={styles.container}>
            <Typography variant="h4" gutterBottom className={styles.title}>Add New Room</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Room Number" name="roomNumber" value={roomDetails.roomNumber} onChange={handleChange} fullWidth required margin="normal" />
                <TextField label="Type" name="type" value={roomDetails.type} onChange={handleChange} fullWidth required margin="normal" />
                <TextField label="Price" name="price" type="number" value={roomDetails.price} onChange={handleChange} fullWidth required margin="normal" />
                <TextField label="Available" name="available" value={roomDetails.available} onChange={handleChange} fullWidth required margin="normal" />
                <Box mt={2}>
                    <Button style={{ background: "#8c6239", color: "white"}}  type="submit"  fullWidth disabled={isLoading}>
                        {isLoading ? "Adding Room..." : "Add Room"}
                    </Button>
                </Box>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </Container>
    );
};

export default AddRoom;

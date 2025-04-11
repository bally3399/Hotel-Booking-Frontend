import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "../AddRoom/Addroom.module.css";


const EditRoom = () => {
    const [roomDetails, setRoomDetails] = useState({
        roomType: "SUITE",
        price: 200.00,
        available: false,
        hotelId: 1
    });

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prev) => ({ ...prev, [name]: value }));
    };


    useEffect(() => {

        const handleRoomAvailability = async (e) => {
            e.preventDefault();
            setIsLoading(true);
            const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbl9zdGV2ZSIsInJvbGVzIjpbIlJPTEVfUk9MRV9BRE1JTiJdLCJpYXQiOjE3NDEwMjIwMjIsImV4cCI6MTc0MTAzOTg4OX0.tU44OuaHMwFRGw71B1j8NuUZhj6u8CxR-o2vzznK0enUp8PALJfOeovosTWnoNHDFKJGPmXdabES2KK1iraJoQ";
    
            try {
                const response = await axios.get("http://hotel-api.fortunaelibrary-api.com/api/v1/rooms/hotel/1/available", null, {
                    headers: { 
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${token}`
                    },
                });
    
                if (response.status === 200) {
                    response.data = "True" ? setIsAvailable(true) : setIsAvailable(false)
                    toast.success("Room Available!", { position: "top-right", autoClose: 3000 });
                } else {
                    toast.error("Failed to add room. Try again.");
                }
            } catch (error) {
                toast.error("Error adding room. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        handleRoomAvailability();
    }, [])


    const handleEdit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbl9zdGV2ZSIsInJvbGVzIjpbIlJPTEVfUk9MRV9BRE1JTiJdLCJpYXQiOjE3NDEwMjIwMjIsImV4cCI6MTc0MTAzOTg4OX0.tU44OuaHMwFRGw71B1j8NuUZhj6u8CxR-o2vzznK0enUp8PALJfOeovosTWnoNHDFKJGPmXdabES2KK1iraJoQ";

        try {
            const response = await axios.put("http://api.fortunaehotel.com/api/v1/rooms/2", roomDetails, {
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

    const handledDelete = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbl9zdGV2ZSIsInJvbGVzIjpbIlJPTEVfUk9MRV9BRE1JTiJdLCJpYXQiOjE3NDEwMjIwMjIsImV4cCI6MTc0MTAzOTg4OX0.tU44OuaHMwFRGw71B1j8NuUZhj6u8CxR-o2vzznK0enUp8PALJfOeovosTWnoNHDFKJGPmXdabES2KK1iraJoQ";

        try {
            const response = await axios.delete("http://api.fortunaehotel.com/api/v1/rooms/2", null, {
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

    // const handleRoomAvailability = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbl9zdGV2ZSIsInJvbGVzIjpbIlJPTEVfUk9MRV9BRE1JTiJdLCJpYXQiOjE3NDEwMjIwMjIsImV4cCI6MTc0MTAzOTg4OX0.tU44OuaHMwFRGw71B1j8NuUZhj6u8CxR-o2vzznK0enUp8PALJfOeovosTWnoNHDFKJGPmXdabES2KK1iraJoQ";

    //     try {
    //         const response = await axios.get("http://hotel-api.fortunaelibrary-api.com/api/v1/rooms/hotel/1/available", null, {
    //             headers: { 
    //                 "Content-Type": "application/json", 
    //                 Authorization: `Bearer ${token}`
    //             },
    //         });

    //         if (response.status === 200) {
    //             response.data = "True" ? setIsAvailable(true) : setIsAvailable(false) 
    //             toast.success("Room Available!", { position: "top-right", autoClose: 3000 });
    //         } else {
    //             toast.error("Failed to add room. Try again.");
    //         }
    //     } catch (error) {
    //         toast.error("Error adding room. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }




    return (
        <Container maxWidth="sm" className={styles.container}>
            <Typography variant="h4" gutterBottom className={styles.title}>Edit/ Delete Room  {`${isAvailable ? 'Room is available' : 'Room is not available'}`} </Typography>
            <form onSubmit={(e) => handleEdit(e)}>
                <TextField label="Room Number" name="roomNumber" value={roomDetails.roomNumber} onChange={handleChange} fullWidth required margin="normal" />
                <TextField label="Type" name="type" value={roomDetails.type} onChange={handleChange} fullWidth required margin="normal" />
                <TextField label="Price" name="price" type="number" value={roomDetails.price} onChange={handleChange} fullWidth required margin="normal" />
                <TextField label="Available" name="available" value={roomDetails.available} onChange={handleChange} fullWidth required margin="normal" />
                <Box mt={2}>
                    <Button  type="submit" variant="contained" className={styles.SubmitBtn} fullWidth disabled={isLoading}>
                        {isLoading ? "Editing Room..." : "Edit Room"}
                    </Button>
                </Box>
                <Box>
                <Button onClick={(e) => handledDelete(e)}  type="submit" variant="contained" className={styles.SubmitBtn} fullWidth disabled={isLoading}>
                        {isLoading ? "Deleting Room..." : "Room Deleted"}
                </Button>
                </Box>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
        </Container>
    );
};

export default EditRoom;

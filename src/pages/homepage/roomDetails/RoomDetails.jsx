import React, { useState } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import { HiArrowLeft } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "./RoomDetails.module.css";

const RoomDetailsPage = () => {
    const [form, setForm] = useState({
        roomType: "SUITE",
        price : 200.00,
        available: true,
        hotelId: 1,
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const token = "85883939738625756";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const payload = {
                roomType: form.roomType,
                price: form.price,
                available: form.available,
                hotelId: form.hotelId,
                
            };

            const response = await axios.put(
                "http://api.fortunaehotel.com/api/v1/rooms/2",
                payload,
                { headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                } 
              }
            );

            if (response.data === "Booked room successfully") {
                toast.success(`Welcome ${form.userId}, you have successfully booked a room!`);
                setTimeout(() => navigate("/login"), 3000);
            } else {
                toast.error("Failed. Please try again.");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Failed to book room. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.roomContainer}>
            <div className={styles.backButton} onClick={() => navigate("/")}>
                <HiArrowLeft className="mr-2" /> Back
            </div>
            <div className={styles.roomCard}>
                <h2 className={styles.roomTitle}> Room Details </h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Room Type"
                        name="roomtype"
                        value={form.roomtype}
                        onChange={handleChange}
                        fullWidth
                        className={styles.formField}
                        sx={{
                            "& label.Mui-focused": { color: "#a68b5b" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a68b5b" },
                                "&.Mui-focused fieldset": { borderColor: "#a68b5b" },
                            },
                            marginBottom: "16px",
                        }}
                    />
                    <TextField
                        label="price"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        fullWidth
                        className={styles.formField}
                        sx={{
                            "& label.Mui-focused": { color: "#a68b5b" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a68b5b" },
                                "&.Mui-focused fieldset": { borderColor: "#a68b5b" },
                            },
                            marginBottom: "16px",
                        }}
                    />
                    <TextField
                        label="available"
                        name="available"
                        value={form.available}
                        onChange={handleChange}
                        fullWidth
                        className={styles.formField}
                        sx={{
                            "& label.Mui-focused": { color: "#a68b5b" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a68b5b" },
                                "&.Mui-focused fieldset": { borderColor: "#a68b5b" },
                            },
                            marginBottom: "16px",
                        }}
                    />
                    
                    <TextField
                        label="Hotel Id"
                        name="hotelId"
                        type="number"
                        value={form.endDate}
                        onChange={handleChange}
                        fullWidth
                        className={styles.formField}
                        sx={{
                            "& label.Mui-focused": { color: "#a68b5b" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black" },
                                "&:hover fieldset": { borderColor: "#a68b5b" },
                                "&.Mui-focused fieldset": { borderColor: "#a68b5b" },
                            },
                            marginBottom: "16px",
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? "Editing ..." : "Edit Now"}
                    </Button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default RoomDetailsPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styles from "../getHotelById/GetHotelById.module.css";
import { HiArrowLeft } from "react-icons/hi";

const API_URL = "https://hotel-booking-management-backend.onrender.com";

const FilterByPriceAndLocationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ minPrice: "", maxPrice: "", location: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

        if (!formData.minPrice || !formData.maxPrice || !formData.location) {
            setMessage("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/v1/admin/filter/price-and-state?minPrice=${formData.minPrice}&maxPrice=${formData.maxPrice}&location=${formData.location}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                const data = await response.json();
                navigate("/filtered-results", { location: { filteredHotels: data } });
            } else {
                setMessage("Failed to fetch hotels.");
            }
        } catch (error) {
            console.error("Error filtering hotels:", error);
            setMessage("Failed to fetch hotels.");
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
                <h2>Filter Hotels By Price and Location</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Minimum Price"
                        name="minPrice"
                        type="number"
                        value={formData.minPrice}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                        disabled={loading}
                    />
                    <TextField
                        label="Maximum Price"
                        name="maxPrice"
                        type="number"
                        value={formData.maxPrice}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        sx={inputStyles}
                        disabled={loading}
                    />
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
                            {loading ? "Fetching..." : "Filter Hotels"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default FilterByPriceAndLocationPage;
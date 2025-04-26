import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi"; // Import the arrow icon
import HotelCard from "../../../component/hotelCard/hotelCard.jsx";
import { toast } from "react-toastify";

const ListOfHotelPage = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(
                    "https://hotel-booking-management-backend.onrender.com/api/v1/hotel/hotels/"
                );
                console.log(response.data.data);
                setHotels(response.data.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized: Token expired or invalid");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [navigate]);

    const onClick = (hotelData) => {
        if (!token) {
            toast.warn("You are not logged in please login");
            navigate("/login");
        }
        navigate("/hotel_details", { state: { hotelData: hotelData } });
    };

    return (
        <div className="px-4 py-6">
            <div className="flex flex-wrap justify-center gap-6">
                {loading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    </div>
                ) : (
                    hotels.map((hotel) => (
                        <HotelCard key={hotel.id} data={hotel} onClick={() => onClick(hotel)} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ListOfHotelPage;
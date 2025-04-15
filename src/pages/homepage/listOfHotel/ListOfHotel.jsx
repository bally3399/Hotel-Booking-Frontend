import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import HotelCard from "../../../component/hotelCard/hotelCard.jsx";

const ListOfHotelPage = () => {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchHotels = async () => {
            try {
                // if (!isAuthenticated()) {
                //     console.error("User is not authenticated");
                //     navigate("/login");
                //     return;
                // }


                const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtYXZlcmlja3NfaHViIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQ0NzA4NzA1fQ.BySqJjDt7NxtaUPKIn6AXwPpNpnF5qEssnA7u5vf4I5to8bydOIZ8Mgb7eh9Ntf7C0SEPjjVsFcxmEqEUnJ8Tw";
                const response = await axios.get("https://hotel-booking-management-backend.onrender.com/api/v1/hotel/hotels/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data)
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


    const  onClick  = (hotelData)=>{
        navigate("/hotel_details", { location: {hotelData: hotelData } })
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 px-4 py-6">
            {/* Show Loading Animation */}
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
    );
};

export default ListOfHotelPage;
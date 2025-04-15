import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { useLocation, useNavigate } from "react-router-dom";
import RoomCard from "../../../component/roomCard/roomCard.jsx";
import NotFoundPage from "../../../component/notFound/notFoundPage.jsx";

const HotelDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotelData } = location.state;

    const [rooms, setRooms] = useState([]); // State to store fetched rooms
    const [loading, setLoading] = useState(true); // State to track loading status

    // Function to check if the user is authenticated
    const isAuthenticated = () => {
        const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtYXZlcmlja3NfaHViIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQ0NzA4NzA1fQ.BySqJjDt7NxtaUPKIn6AXwPpNpnF5qEssnA7u5vf4I5to8bydOIZ8Mgb7eh9Ntf7C0SEPjjVsFcxmEqEUnJ8Tw"; // Check if a token exists in local storage
        return !!token; // Return true if token exists, false otherwise
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                // Check if the user is authenticated
                if (!isAuthenticated()) {
                    console.error("User is not authenticated");
                    navigate("/login"); // Redirect to login page if not authenticated
                    return;
                }

                // Fetch data from the backend API
                const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtYXZlcmlja3NfaHViIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNzQ0NzA4NzA1fQ.BySqJjDt7NxtaUPKIn6AXwPpNpnF5qEssnA7u5vf4I5to8bydOIZ8Mgb7eh9Ntf7C0SEPjjVsFcxmEqEUnJ8Tw"; // Get the token from local storage
                const response = await axios.get(
                    `https://hotel-booking-management-backend.onrender.com/api/v1/room/hotel/${hotelData.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the request headers
                        },
                    }
                );

                setRooms(response.data.data); // Set the fetched data to state
            } catch (error) {
                console.error("Error fetching rooms:", error);
                if (error.response && error.response.status === 401) {
                    // Handle unauthorized access (e.g., token expired)
                    console.error("Unauthorized: Token expired or invalid");
                    navigate("/login"); // Redirect to login page
                }
            } finally {
                setLoading(false); // Stop loading once the data is fetched or an error occurs
            }
        };

        fetchRooms();
    }, [navigate, hotelData.id]);

    return (
        <main className="flex flex-col items-start">
            {/* Hotel Image */}
            <img className="w-full md:h-full" src={hotelData?.pictureUrls[0]} alt={hotelData?.name} />

            {/* Hotel Name */}
            <p className="text-2xl md:text-3xl font-bold font-sans p-2">{hotelData?.name}</p>

            {/* Hotel Description */}
            <p className="text-xl font-sans px-2">{hotelData?.description}</p>

            {/* Hotel State */}
            <p className="text-xl font-sans px-2">
                <span className="text-xl md:text-2xl font-bold">State:</span> {hotelData?.state}
            </p>

            {/* Hotel City */}
            <p className="text-xl font-sans px-2">
                <span className="text-xl md:text-2xl font-bold">City:</span> {hotelData?.location}
            </p>

            {/* List of Rooms Title */}
            <p className="font-sans-serif text-3xl font-bold self-center mt-4">List Of Rooms</p>

            {/* Loading Animation */}
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : (

                <div className="flex flex-wrap justify-center gap-8 md:gap-22 px-4 py-6">
                    {
                        rooms.length > 0 ? rooms.map((room) => (
                                <RoomCard key={room.id} data={room} />
                            )) : <NotFoundPage emoji={"😶"} text={"No Room Added Yet"} />
                    }

                </div>
            )}
        </main>
    );
};

export default HotelDetails;
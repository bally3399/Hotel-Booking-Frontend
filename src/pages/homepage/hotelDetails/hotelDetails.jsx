import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { useLocation, useNavigate } from "react-router-dom";
import RoomCard from "../../../component/roomCard/roomCard.jsx";
import NotFoundPage from "../../../component/notFound/notFoundPage.jsx";
import image1 from "../../../assets/img/hotel4.jpeg";


const HotelDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotelData } = location.state;

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);


    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        return !!token;
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {

                if (!isAuthenticated()) {
                    console.error("User is not authenticated");
                    navigate("/login");
                    return;
                }


                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `https://hotel-booking-management-backend.onrender.com/api/v1/rooms/hotel/${hotelData.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response.data)
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized: Token expired or invalid");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [navigate, hotelData.id]);

    return (
        <main className="flex flex-col items-start">
            {/* Hotel Image */}
            <img className="w-full md:h-[550px] object-cover" src={hotelData?.pictureUrls[0] ?  hotelData?.pictureUrls[0] :image1 } alt={hotelData?.name} />

            {/* Hotel Name */}
            <p className="text-2xl md:text-3xl font-bold font-sans p-2">{hotelData?.name}</p>

            {/* Hotel Description */}
            <p className="text-xl font-sans px-2">{hotelData?.description}</p>

            {/* Hotel State */}
            <p className="text-xl font-sans px-2">
                <span className="text-xl md:text-2xl font-bold">State:</span> {hotelData?.location}
            </p>

            {/* Hotel City */}
            <p className="text-xl font-sans px-2">
                <span className="text-xl md:text-2xl font-bold">City:</span> {hotelData?.location}
            </p>

            {/* List of Rooms Title */}
            <p className="font-sans-serif text-3xl font-bold self-center mt-4">List Of Rooms</p>

            {/* Loading Animation */}
            {loading ? (
                <div className="w-full flex items-center justify-center min-h-screen">
                    <div className="animate-spin self-center rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : (

                <div className="w-[100%] flex flex-wrap justify-center gap-8 md:gap-22 px-4 py-6">
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
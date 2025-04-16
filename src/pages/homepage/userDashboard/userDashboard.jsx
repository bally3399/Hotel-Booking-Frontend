import React, { useState, useEffect } from "react";
import axios from "axios";
import ListOfHotel from "../listOfHotel/ListOfHotel.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../../../component/modal/model.jsx";
import ModalHotelCard from "../../../component/modal/modalHotelCard.jsx";

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchBy, setSearchBy] = useState("hotelName");
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control the modal
    const [error, setError] = useState("");

    useEffect(() => {
        setSearchResults([]);
        setShowModal(false);
    }, []);

    const handleSearch = async () => {
        if (searchQuery.trim() === "") return;

        let url = "";
        if (searchBy === "hotelName") {
            url = `https://hotel-booking-management-backend.onrender.com/api/v1/hotel/${encodeURIComponent(searchQuery)}`;
        } else if (searchBy === "location") {
            url = `https://hotel-booking-management-backend.onrender.com/api/v1/hotel/location/${encodeURIComponent(searchQuery)}`;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data;
            const normalizedResults = Array.isArray(data) ? data : [data];
            setSearchResults(normalizedResults);
            setShowModal(true); // Open the modal
            setError(""); // Clear any previous errors
        } catch (err) {
            console.error("Search error:", err);
            setSearchResults([]);
            setError("An error occurred while fetching results. Please try again.");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const onClick = (hotelData) => {
        navigate("/hotel_details", { state: { hotelData: hotelData } });
    };

    const handleOnClick = () => {
        navigate("/bookedRoom");
    };

    return (
        <main className="flex flex-col gap-10 mt-5">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4">
                <p className="self-center text-3xl font-bold text-[#7c6a46] font-sans text-center pb-6 md:pb-0">
                    Welcome to Fortunaé IT Hotel MS
                </p>

                {/* Search Form */}
                <div className="flex items-center justify-center gap-2 md:gap-0">
                    <select
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 h-10"
                    >
                        <option value="hotelName">Hotel Name</option>
                        <option value="location">Location</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`Search by ${searchBy === "hotelName" ? "hotel name" : "location"}...`}
                        className="border border-gray-300 rounded-lg px-3 py-2 mt-2 h-10 w-full md:w-auto"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[#7c6a46] text-white rounded-lg px-3 py-2 h-10"
                    >
                        Search
                    </button>
                </div>

                <button
                    onClick={handleOnClick}
                    className="bg-[#7c6a46] text-white rounded-3xl py-2 px-6 hover:-translate-y-1 transition duration-300 self-center"
                >
                    View Booked Room
                </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Modal for displaying search results */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="max-h-110 flex flex-wrap items-center justify-center w-full overflow-y-auto">
                    {searchResults.length === 0 ? (
                        <p className="text-center text-gray-600">No results found.</p>
                    ) : (
                        searchResults.map((hotel) => (
                            <ModalHotelCard data={hotel} onClick={() => onClick(hotel)} />
                        ))
                    )}
                </div>
            </Modal>

            {!showModal && <ListOfHotel />}
        </main>
    );
};

export default Dashboard;
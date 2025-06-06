import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const RoomBookingPage = () => {
    const [showAllImages, setShowAllImages] = useState(false);
    const [form, setForm] = useState({ startDate: "", endDate: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false); // Track if the room is booked
    const [loading, setLoading] = useState(false); // Track loading state for the Pay button
    const location = useLocation();
    const navigate = useNavigate();
    const { roomData, room } = location.state;
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch booking details for the room
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(
                    `https://hotel-booking-management-backend.onrender.com/api/v1/bookings/${room.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const booking = response.data;

                if (booking && booking.endDate) {
                    const currentDate = new Date();
                    const bookingEndDate = new Date(booking.endDate);

                    if (currentDate <= bookingEndDate) {
                        // Room is booked, set the dates and disable editing
                        setForm({
                            startDate: booking.startDate.split("T")[0],
                            endDate: booking.endDate.split("T")[0],
                        });
                        setIsBooked(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching booking details:", error);
                toast.error("Failed to fetch booking details.");
            }
        };

        fetchBookingDetails();
    }, [room.id, token]);

    const toggleImageDisplay = () => {
        setShowAllImages(!showAllImages);
    };

    const handleChange = (e) => {
        if (isBooked) return; // Prevent changes if the room is booked
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleBookRoom = () => {
        if (!form.startDate || !form.endDate) {
            alert("Please select both Check In and Check Out dates.");
            return;
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const renderImages = () => {
        const images = roomData;

        if (showAllImages) {
            return (
                <div className="grid grid-cols-1 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`room-${index}`}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    ))}
                    <button
                        onClick={toggleImageDisplay}
                        className="bg-gray-200 text-black py-2 px-4 mt-4 rounded self-center"
                    >
                        Back
                    </button>
                </div>
            );
        }

        if (images.length === 2) {
            return (
                <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`room-${index}`}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    ))}
                </div>
            );
        }

        if (images.length >= 3) {
            const otherImagesCount = images.length - 2;
            return (
                <div className="w-full grid grid-cols-2 gap-4 h-[18rem] md:h-full">
                    <img
                        src={images[0]}
                        alt="room-1"
                        className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="flex flex-col gap-4 h-full">
                        <img
                            src={images[1]}
                            alt="room-2"
                            className="w-full h-1/2 object-cover rounded-lg"
                        />
                        <div
                            className="relative w-full h-1/2 cursor-pointer"
                            onClick={toggleImageDisplay}
                        >
                            <img
                                src={images[2]}
                                alt="room-3"
                                className="w-full h-full object-cover rounded-lg brightness-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-4xl font-bold">
                                    +{otherImagesCount}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    const payload = {
        userId: user?.id,
        roomId: room?.id,
        hotelId: room?.hotelId,
        startDate: form.startDate + "T00:00:00",
        endDate: form.endDate + "T00:00:00",
    };

    const handlePaymentSuccess = async () => {
        setLoading(true); // Start loading
        try {
            await axios.post(
                "https://hotel-booking-management-backend.onrender.com/api/v1/bookings/book",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Room booked successfully!");
            navigate("/user-dashboard");
        } catch (error) {
            console.error("Error booking room:", error);
            toast.error("Failed to book room. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex w-full flex-col items-center p-8 bg-gray-100">
            <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8">
                {renderImages()}
            </div>
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                <p className="text-md font-semibold font-sans px-2 mb-4">
                    <span className="text-2xl font-semibold">Type:</span>&nbsp;&nbsp;
                    {room?.roomType}
                </p>
                <p className="text-md font-semibold font-sans px-2 mb-4">
                    <span className="text-2xl font-semibold">Price:</span>&nbsp;&nbsp;
                    £{room?.price}
                </p>
                {/* Check In and Check Out Fields */}
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Check In
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                        disabled={isBooked} // Disable if the room is booked
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#a68b5b]"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Check Out
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={form.endDate}
                        onChange={handleChange}
                        disabled={isBooked} // Disable if the room is booked
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#a68b5b]"
                    />
                </div>
                {/* Book Room Button */}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    onClick={handleBookRoom}
                    disabled={isBooked}
                >
                    Book Room
                </button>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-[90%] md:w-[40%] p-6 border-2 border-[#a68b5b] rounded-2xl">
                            <p className="text-2xl text-[#a68b5b] self-center font-bold font-sans mb-4">
                                Make Payment
                            </p>
                            {/* Mock Payment Form */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="4242 4242 4242 4242"
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Expiration Date
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="06/28"
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        disabled
                                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            {/* Pay Button */}
                            <button
                                className={`bg-blue-500 text-white py-2 px-4 rounded transition-colors w-full ${
                                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                                }`}
                                onClick={handlePaymentSuccess}
                                disabled={loading} // Disable button during loading
                            >
                                {loading ? "Processing..." : `Pay £${room?.price}`}
                            </button>
                            <button
                                className="mt-4 bg-red-500 self-center text-white py-2 px-4 rounded hover:bg-red-600 transition-colors w-full"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default RoomBookingPage;
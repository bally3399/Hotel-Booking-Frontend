import React from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation, useNavigate} from "react-router-dom";
import {FaShower, FaTv, FaWifi} from "react-icons/fa";
import axios from "axios";

const RoomCard = ({ data }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isBookedRoomPage = location.pathname.includes("bookedRoom");

    const handleBookRoom = () => {
        if (!localStorage.getItem("token")) {
            toast.error("You are not Logged in so you can't book room. Please Log in to book room!");
            return;
        }
        if (!data?.available) {
            toast.error("This room is not available for booking!", {
                position: "top-right",
                autoClose: 3000,
            });
        } else {
            const slicedData = data?.pictureUrls;
            navigate("/roomDetails", { state: { roomData: slicedData, room: data } });
        }
    };

    const handleCancelBooking = async () => {
        try {
            const user = localStorage.getItem("user");
            const userId = user.id;
            const bookingId = data?.id;

            if (!userId || !bookingId) {
                toast.error("User ID or Booking ID is missing.");
                return;
            }

             const response = await axios.delete(
                `https://hotel-booking-management-backend.onrender.com/api/v1/bookings/cancel/${bookingId}?userId=${userId}`
                );
            if(response.status === 200) toast.success("Booking cancelled successfully!");
            else toast.error(response.data);

        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };

    return (
        <main className="flex flex-col items-start gap-3 md:w-[25%] w-[98%] mt-4 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 bg-white pb-5">
            <div className="rounded-t-3xl overflow-hidden">
                <img
                    className="w-[400px] h-[280px] object-cover"
                    src={data?.pictureUrls[0]}
                    alt={"rooms"}
                />
            </div>
            <p className="text-md font-semibold font-sans px-2">
                <span className="text-2xl font-semibold">Type:</span>&nbsp;&nbsp;
                {data?.roomType}
            </p>
            <p className="text-md font-semibold font-sans px-2">
                <span className="text-2xl font-semibold">Price:</span>&nbsp;&nbsp;
                £{data?.price}
            </p>
            <p
                className={`text-md font-semibold font-sans px-2 ${
                    !data?.available ? "text-red-400" : "text-green-400"
                }`}
            >
                <span className="text-2xl font-semibold text-black">Available:</span>
                &nbsp;&nbsp;{data?.available ? "True" : "False"}
            </p>
            <div className="flex items-center justify-between w-full px-3">
                <div className="flex gap-8">
                    <FaTv />
                    <FaShower />
                    <FaWifi />
                </div>
                <button
                    className={`${
                        isBookedRoomPage ? "bg-red-500" : "bg-[#7c6a46]"
                    } text-white rounded-3xl py-2 px-6 hover:-translate-y-1 transition duration-300 self-center`}
                    onClick={isBookedRoomPage ? handleCancelBooking : handleBookRoom}
                >
                    {isBookedRoomPage ? "Cancel Booking" : "Book Room"}
                </button>
            </div>
        </main>
    );
};

export default RoomCard;

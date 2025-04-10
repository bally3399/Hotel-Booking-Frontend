import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomDetails from "../../pages/homepage/roomDetails/RoomDetails.jsx";
import RoomBookingPage from "../../pages/homepage/roomDetails/RoomDetails.jsx";
import roomCardData from "./roomCardData.js";
import {useNavigate} from "react-router-dom";
import {FaShower, FaTv, FaWifi} from "react-icons/fa";

const RoomCard = ({ data,index }) => {
    const navigate = useNavigate();
    const handleBookRoom = () => {
        if (!data?.available) {
            // Show error toast if the room is not available
            toast.error("This room is not available for booking!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            const slicedData = roomCardData.slice(4, 9).map((item) => item.img);
            const selectedRoom = roomCardData.find(data => data.id === index-1);
            // console.log(selectedRoom);
            navigate("/roomDetails", { state: { roomData: slicedData,price: selectedRoom?.price,type: selectedRoom?.type} });
        }
    };

    return (
        <main className="flex flex-col items-start gap-3 md:w-[20%] w-[98%] mt-4 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 bg-white pb-5">
            <div className="rounded-t-3xl overflow-hidden">
                <img
                    className="w-full h-[280px] object-cover"
                    src={data?.img}
                    alt={"rooms"}
                />
            </div>
            <p className="text-md font-semibold font-sans px-2">
                <span className="text-2xl font-semibold">Type:</span>&nbsp;&nbsp;
                {data?.type}
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
                    <FaTv/>
                    <FaShower/>
                    <FaWifi/>
                </div>
                <button
                    className={`bg-[#7c6a46] text-white rounded-3xl py-2 px-6 hover:-translate-y-1 transition duration-300 self-center ${
                        !data?.available && "cursor-not-allowed opacity-70"
                    }`}
                    onClick={handleBookRoom}
                >
                    Book Room
                </button>
            </div>

        </main>
    );
};

export default RoomCard;
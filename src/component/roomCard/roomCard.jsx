import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useNavigate} from "react-router-dom";
import {FaShower, FaTv, FaWifi} from "react-icons/fa";

const RoomCard = ({ data}) => {
    const navigate = useNavigate();
    const handleBookRoom = () => {
        if(!localStorage.getItem("token")){
            toast.error("You are not Logged in so you cant book room. Please Log in to book room!");
            return
        }
        if (!data?.available) {
            toast.error("This room is not available for booking!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            const slicedData = data?.pictureUrls;
            console.log(slicedData)
            const selectedRoom = data;
             console.log(selectedRoom);
            navigate("/roomDetails", { state: { roomData: slicedData,room:selectedRoom} });
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
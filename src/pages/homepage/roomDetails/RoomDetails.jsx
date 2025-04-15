import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation, useNavigate} from "react-router-dom";



const RoomBookingPage = () => {
    const [showAllImages, setShowAllImages] = useState(false);
    const location = useLocation();
    const { roomData,price,type } = location.state;
    const toggleImageDisplay = () => {
        setShowAllImages(!showAllImages);
    };
    const navigate = useNavigate();
    const handlePay = () =>{
        navigate("/payment",{state:{price:price}})
    }
    const renderImages = () => {
        const   images  = roomData;

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
                    {/* Left: first image, full height */}
                    <img
                        src={images[0]}
                        alt="room-1"
                        className="w-full h-full object-cover rounded-lg"
                    />

                    {/* Right: second and third stacked */}
                    <div className="flex flex-col gap-4 h-full">
                        <img
                            src={images[1]}
                            alt="room-2"
                            className="w-full h-1/2 object-cover rounded-lg"
                        />

                        {/* Third image with overlay */}
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

    return (
        <div className="flex w-full flex-col items-center p-8 bg-gray-100 ">
        {/* Images Section */}
            <div className="w-full bg-white rounded-lg shadow-lg p-6 mb-8">
                {renderImages()}
            </div>

            {/* Room Details Section */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2 md:p-6 ">
                <p className="text-md font-semibold font-sans px-2">
                    <span className="text-2xl font-semibold">Type:</span>&nbsp;&nbsp;
                    {type}
                </p>
                <p className="text-md font-semibold font-sans px-2">
                    <span className="text-2xl font-semibold">Price:</span>&nbsp;&nbsp;
                    £{price}
                </p>
                <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded" onClick={handlePay}>
                    book room
                </button>
            </div>

            <ToastContainer/>
        </div>
    );
};

export default RoomBookingPage;
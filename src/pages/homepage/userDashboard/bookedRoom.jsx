import React from "react";
import BookedRoomData from "./bookedRoom.js"; // Assuming this is an array of booked room data
import NotFoundPage from "../../../component/notFound/notFoundPage.jsx";
import RoomCard from "../../../component/roomCard/roomCard.jsx";

const BookedRoom = () => {
    return (
        <main className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
            <p className="self-center text-3xl font-bold text-[#7c6a46] font-sans">
                Booked Rooms
            </p>
            {/* Conditional Rendering */}
            {BookedRoomData.length > 0 ? (
                <div className="flex flex-wrap gap-6 w-full justify-evenly">
                    {BookedRoomData.map((room) => (
                        <RoomCard data={room} key={room.id} index={room.id} />
                    ))}
                </div>
            ) : (
                <NotFoundPage text="No Rooms Booked Yet" emoji={'🥲'}/>
            )}
        </main>
    );
};

export default BookedRoom;
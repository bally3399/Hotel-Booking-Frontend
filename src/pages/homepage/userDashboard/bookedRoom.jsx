// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NotFoundPage from "../../../component/notFound/notFoundPage.jsx";
// import RoomCard from "../../../component/roomCard/roomCard.jsx";
//
// const BookedRoom = () => {
//     const [bookedRooms, setBookedRooms] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?.id;
//
//     useEffect(() => {
//         const fetchBookedRooms = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get(
//                     `https://hotel-booking-management-backend.onrender.com/api/v1/bookings/${userId}`,
//                     {
//                         headers: { Authorization: `Bearer ${token}` },
//                     }
//                 );
//                 console.log("Fetched Booked Rooms:", response.data.data);
//                 if (Array.isArray(response.data.data)) {
//                     setBookedRooms(response.data.data);
//                 } else {
//                     setError("Invalid data format received from the server.");
//                 }
//             } catch (err) {
//                 console.error("Error fetching booked rooms:", err);
//                 setError("Failed to fetch booked rooms. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchBookedRooms();
//     }, []);
//
//     if (loading) {
//         return (
//             <main className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
//                 <p className="self-center text-3xl font-bold text-[#7c6a46] font-sans">
//                     Booked Rooms
//                 </p>
//                 <p className="mt-4 text-lg text-gray-600">Loading...</p>
//             </main>
//         );
//     }
//
//     if (error) {
//         return (
//             <main className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
//                 <p className="self-center text-3xl font-bold text-[#7c6a46] font-sans">
//                     Booked Rooms
//                 </p>
//                 <p className="mt-4 text-lg text-red-500">{error}</p>
//             </main>
//         );
//     }
//
//     return (
//         <main className="flex flex-col items-center p-8 min-h-screen bg-gray-100">
//             <p className="self-center text-3xl font-bold text-[#7c6a46] font-sans">
//                 Booked Rooms
//             </p>
//             {bookedRooms.length > 0 ? (
//                 <div className="flex flex-wrap gap-6 w-full justify-evenly">
//                     {bookedRooms.map((room) => (
//                         <RoomCard data={room} key={room.id} index={room.id} />
//                     ))}
//                 </div>
//             ) : (
//                 <NotFoundPage text="No Rooms Booked Yet" emoji={'🥲'} />
//             )}
//         </main>
//     );
// };
//
// export default BookedRoom;
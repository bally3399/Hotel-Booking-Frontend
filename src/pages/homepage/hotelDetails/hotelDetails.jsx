import RoomCard from "../../../component/roomCard/roomCard.jsx";
import roomCardData from '../../../component/roomCard/roomCardData.js'
import {useLocation} from "react-router-dom";

const HotelDetails = ()=>{
    const location = useLocation();
    const { hotelData } = location.state;
    return (
        <main className="flex flex-col items-start ">
            <img className="w-full  md:h-full" src={hotelData.img} alt={""}/>
            <p className=" text-2xl md:text-3xl font-bold font-sans p-2">{hotelData.name}</p>
            <p className="text-xl font-sans px-2">{hotelData.description}</p>
            <p className="text-xl font-sans px-2">
                <span className="text-xl md:text-2xl font-bold">State: </span>{hotelData.state}
            </p>
            <p className="text-xl font-sans px-2">
                <span className="text-xl md:text-2xl font-bold">City: </span>{hotelData.location}
            </p>
            <p className="font-sans-serif text-3xl font-bold self-center mt-4">List Of Rooms</p>
            <div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-22 px-4 py-6">
                    {roomCardData.map((room) => (
                        <RoomCard key={room.id} data={room} index={room.id}/>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default HotelDetails;
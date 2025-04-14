import HotelCard from "../../../component/hotelCard/hotelCard.jsx";
import HotelData from "../../../component/hotelCard/hotelData.js";
import {useNavigate} from "react-router-dom";

const ListOfHotelPage = () => {
    const navigate = useNavigate();
    // const [hotels, setHotels] = useState([]);
    //
    // useEffect(() => {
    //     const fetchHotels = async () => {
    //         try {
    //             const response = await axios.get("/api/v1/hotels/list");
    //             setHotels(response.data);
    //         } catch (error) {
    //             console.error("Error fetching hotels:", error);
    //         }
    //     };
    //     fetchHotels();
    // }, []);

    const  onClick  = (hotelData)=>{
        navigate("/hotel_details", { location: {hotelData: hotelData } })
    }

    return (
        <div className="flex flex-wrap justify-center gap-25 px-4 py-6">
            {HotelData.map((hotel) => (
                <HotelCard key={hotel.id} data={hotel} onClick={()=>onClick(hotel)}/>
            ))}
        </div>
    );
};

export default ListOfHotelPage;

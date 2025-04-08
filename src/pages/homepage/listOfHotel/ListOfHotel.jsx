import { useEffect, useState } from "react";
import axios from "axios";

const ListOfHotelPage = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("/api/v1/hotels/list");
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };
        fetchHotels();
    }, []);

    return (
        <div>
            <h1>List of Hotels</h1>
            {hotels.length > 0 ? (
                <ul>
                    {hotels.map((hotel) => (
                        <li key={hotel.id}>{hotel.name} - {hotel.location}</li>
                    ))}
                </ul>
            ) : (
                <p>No hotels found.</p>
            )}
        </div>
    );
};

export default ListOfHotelPage;

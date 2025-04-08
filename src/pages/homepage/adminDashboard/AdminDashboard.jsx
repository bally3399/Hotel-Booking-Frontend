import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/navbar/Navbar";
import Footer from "../../../component/footer";
import styles from "./AdminDashboard.module.css";
import { useEffect, useState } from "react";
import axios from 'axios';


const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState([])
    const [type, setType] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [availableOnly, setAvailableOnly] = useState(false);
   const [state, setState] = useState("new York");

    const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbl9zdGV2ZSIsInJvbGVzIjpbIlJPTEVfUk9MRV9BRE1JTiJdLCJpYXQiOjE3NDEwMjIwMjIsImV4cCI6MTc0MTAzOTg4OX0.tU44OuaHMwFRGw71B1j8NuUZhj6u8CxR-o2vzznK0enUp8PALJfOeovosTWnoNHDFKJGPmXdabES2KK1iraJoQ";
    useEffect(() => {
        const fetchRooms = async () => {
        try{
            setLoading(true);
            const response = await axios.get("http://api.fortunaehotel.com/api/v1/rooms/hotel/1", null, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            setRooms(response);
        }catch(error){
console.error(error);
        }finally{
            setLoading(false);
        }
    }
    fetchRooms();
}, []);



const toggleRoomStatus = async (roomId, isActive) => {
    try {
        setLoading(true);
        await axios.put(`http://api.fortunaehotel.com/api/v1/rooms/hotel/1/${isActive ? "deactivate" : "activate"}/${roomId}`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        alert(`Room ${isActive ? "deactivated" : "activated"} successfully!`);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};

    const handleUpdate = () => {
      navigate("/edit-room");
    }


    const handleDelete = () => {
        try{
            setLoading(true);
            const response = axios.delete("http://api.fortunaehotel.com/api/v1/rooms/2", null, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("Deleted", response);
            alert("Room deleted successfully");
            navigate("/rooms");
        }catch(error){
            console.error(error);
        }
    }



const handleFilterByType = () => {
    try{
        setLoading(true);
        const response = axios.get(`http://api.fortunaehotel.com/api/v1/rooms/hotel/1/filter?type=${type}`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        setFilteredRooms(response);
    }catch(error){
        console.error(error);
    }
}

// http://hotel-api.fortunaelibrary-api.comapi/v1/rooms/filter/price?minPrice={minPrice}&maxPrice={maxPrice}

const handleFilterByPriceRange = () => {
    try{
        setLoading(true);
        const response = axios.get(`http://api.fortunaehotel.com/api/v1/rooms/filter/price?minPrice=${minPrice}&maxPrice=${maxPrice}`, null, )
        setFilteredRooms(response);
    }catch(error){
        console.error(error);
    }
};


// http://hotel-api.fortunaelibrary-api.com/api/v1/rooms/1/availability

const handleFilterByState = () => {
    try{
        setLoading(true);
        const response = axios.get(`http://api.fortunaehotel.com/api/v1/rooms/filter/state?state=${state}`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        setFilteredRooms(response);
    }catch(error){
        console.error(error);
    }
};

const getAvailableRooms = () => {
    try{
        setLoading(true);
        const response = axios.get(`http://api.fortunaehotel.com/api/v1/rooms/1/availability`, null, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        })
        setFilteredRooms(response);
    }catch(error){
        console.error(error);
    }
}

   // http://api.fortunaehotel.com/api/v1/rooms/2


    return (
        <main>
            <Navbar/>
            <div className={styles.dashboard}>
                <button onClick={() => navigate("/create-hotel")} className={styles.actionButton}>Create Hotel</button>
                <button onClick={() => navigate("/list")} className={styles.actionButton}>List Of Hotel</button>
                <button onClick={() => navigate("/roomDetails")} className={styles.actionButton}>Get Hotel Details</button>
                <button onClick={() => navigate("/add-room")} className={styles.actionButton}>Add Room To Hotel</button>
                <button onClick={() => navigate("/delete")} className={styles.actionButton}>Delete Hotel</button>
                <button onClick={() => navigate("/view")} className={styles.actionButton}>Get Total Hotel In State</button>
                <button onClick={() => navigate("/ViewHistory")} className={styles.actionButton}>Delete Room From Hotel</button>
            </div>

            <div className={styles.filterContainer}>
                <h3>Filter Rooms</h3>
                <input
                    type="text"
                    placeholder="Type (e.g. Suite, Deluxe)"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
<button onClick={handleFilterByType}>Apply Filters</button>

<div>
<input
                    type="text"
                    placeholder="Type (e.g. Suite, Deluxe)"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <button onClick={handleFilterByState}>Apply Filter</button>
</div>

<div>
<button onClick={getAvailableRooms}>Get All Available Rooms</button>
</div>

<div>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button onClick={handleFilterByPriceRange}>Apply Filters</button>
                </div>
            </div>



            <div className={styles.roomList}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    (filteredRooms.length > 0 ? filteredRooms : rooms).map((room) => (
                        <div key={room.id} className={styles.roomCard}>
                            <img src={room.img} alt={room.name} className={styles.roomImage} />
                            <p>{room.name}</p>
                            <p>${room.price}</p>
                            <button onClick={() => navigate(`/edit-room`)}>Edit</button>
                            <button onClick={(e) => handleDelete(e)}>Delete</button>
                            <button onClick={() => toggleRoomStatus(room.id, room.isActive)}>
                                {room.isActive ? "Deactivate" : "Activate"}
                            </button>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </main>
    );
};

export default Dashboard;


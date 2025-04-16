import {  useRef } from "react";
import Navbar from "../../../component/navbar/Navbar";
import styles from "./Rooms.module.css";
import Scroll from "../../../assets/scroll down.png";
import Image from "../../../assets/rooms.png";
import { FaShower, FaTv, FaWifi } from "react-icons/fa";
import { Link } from "react-router-dom";
import ListOfHotelPage from "../listOfHotel/ListOfHotel.jsx";


const rooms = [
    {
        id: 1,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
    {
        id: 2,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
    {
        id: 3,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
    {
        id: 4,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
    {
        id: 5,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
    {
        id: 6,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
    {
        id: 7,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
    {
        id: 8,
        title: "The Royal Room",
        price: "₦190,000",
        available: "Yes",
        image: Image,
    },
];




const RoomsPage = () => {


    // useEffect(() => {
    //        const response = axios.get("http://api.fortunaehotel.com/api/v1/rooms/hotel/1", {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //     },
    //  })
    
    //  console.log(response);
    //  console.log(token);

    // });
    
    const roomsRef = useRef(null);

    const scrollToRooms = () => {
        if (roomsRef.current) {
            roomsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };



    return (
        <main>
            <div className={styles.roomContainer}>
                <h1 className={styles.title}>Hotels and Rooms</h1>
                <p className={styles.subTitle}>
                    The elegant luxury bedrooms in this gallery showcase custom interior
                    designs & decorating ideas. View pictures and find your
                    perfect luxury bedroom design in the hotels.
                </p>
                <img
                    className={styles.image}
                    src={Scroll}
                    alt="Scroll down"
                    onClick={scrollToRooms}
                    style={{ cursor: "pointer" }}
                />
            </div>
            <ListOfHotelPage/>
        </main>
    );
};

export default RoomsPage;

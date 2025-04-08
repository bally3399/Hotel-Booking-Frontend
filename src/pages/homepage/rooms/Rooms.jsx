import {  useRef } from "react";
import Navbar from "../../../component/navbar/Navbar";
import styles from "./Rooms.module.css";
import Scroll from "../../../assets/scroll down.png";
import Image from "../../../assets/rooms.png";
import { FaShower, FaTv, FaWifi } from "react-icons/fa";
import { Link } from "react-router-dom";


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
            <Navbar />
            <div className={styles.roomContainer}>
                <h1 className={styles.title}>Rooms and suites</h1>
                <p className={styles.subTitle}>
                    The elegant luxury bedrooms in this gallery showcase custom interior
                    designs & decorating ideas. View pictures and find your
                    perfect luxury bedroom design.
                </p>
                <img
                    className={styles.image}
                    src={Scroll}
                    alt="Scroll down"
                    onClick={scrollToRooms}
                    style={{ cursor: "pointer" }}
                />
            </div>
            <section ref={roomsRef} className={styles.roomsContainer}>
                {rooms.map((room) => (
                    <div key={room.id} className={styles.container}>
                        <img src={room.image} alt={room.title} className="room-image" />
                        <div className={styles.content}>
                            <h2 className={styles.roomTitle}>{room.title}</h2>
                            <p className={styles.roomPrice}>{room.price}</p>
                            <p className={styles.roomAvailability}>Available: {room.available}</p>

                            <div className={styles.roomFooter}>
                                <div className={styles.roomIcons}>
                                    <FaTv />
                                    <FaShower />
                                    <FaWifi />
                                </div>
                                <Link to={"/roomDetails"}>
                                    <button  className={styles.roomButton}>Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default RoomsPage;

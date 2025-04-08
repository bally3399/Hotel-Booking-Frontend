import Navbar from "../../../component/navbar/Navbar";
import HeroImage from "../../../assets/homepageImage.png";
import styles from "./HeroPage.module.css";
import Image from "../../../assets/makiSwimming0.png"
import Image2 from "../../../assets/Vector (1).png"
import Image3 from "../../../assets/Vector (2).png"
import Image4 from "../../../assets/Vector (3).png"
import Image5 from "../../../assets/Vector (4).png"
import Image6 from "../../../assets/Vector (5).png"
import Image7 from "../../../assets/Vector (6).png"
import Image8 from "../../../assets/Vector (7).png"
import room1 from "../../../assets/Rectangle 10.png"
import room2 from "../../../assets/Rectangle 10 (1).png"
import room3 from "../../../assets/Rectangle 10 (2).png"
import {Link} from "react-router-dom";
import Footer from "../../../component/footer";

const facilities = [
    { id: 1, name: "Swimming Pool", image: Image },
    { id: 2, name: "Wifi", image: Image2 },
    { id: 3, name: "Breakfast", image: Image3 },
    { id: 4, name: "Gym", image: Image4 },
    { id: 5, name: "Game center", image: Image5 },
    { id: 6, name: "24/7 Light", image: Image6 },
    { id: 7, name: "Laundry", image: Image7 },
    { id: 8, name: "Parking space", image: Image8 },
];

const rooms = [
    {
        id: 1,
        image: room1,
        availability: "2 rooms available",
        description: "Television set, Extra sheets and Breakfast",
    },
    {
        id: 2,
        image: room2,
        availability: "4 rooms available",
        description: "Television set, Extra sheets, Breakfast, and fireplace",
    },
    {
        id: 3,
        image: room3,
        availability: "8 rooms available",
        description: "Television set, Extra sheets, Breakfast, fireplace, Console, and bed rest",
    },
];


const HeroPage = () => {
    return (
        <main className={styles.main}>
            <Navbar/>
            <div className={styles.heroContainer}>
                <div className={styles.textSection}>
                    <h2 className={styles.subTitle}>Fortunae IT Hotel Booking App</h2>
                    <h1 className={styles.mainTitle}>
                        Hotel for every moment rich in emotion
                    </h1>
                    <p className={styles.Description}>
                        Every moment feels like the first time in paradise
                    </p>
                    <div className={styles.buttonContainer}>
                        <a href="/rooms" className={styles.bookNow}>
                            Book now
                        </a>
                        <a href="/tour" className={styles.takeTour}>
                            Take a tour
                        </a>
                    </div>
                </div>

                <div className={styles.imageSection}>
                    <img src={HeroImage} className={styles.heroImage} alt="Hotel View"/>
                </div>
            </div>

            <div className={styles.bookingSection}>
                <div className={styles.bookingGrid}>
                    <select className={styles.inputField}>
                        <option>Location</option>
                        <option>Abuja</option>
                        <option>Lagos</option>
                    </select>
                    <select className={styles.inputField}>
                        <option>Room Type</option>
                        <option>Standard</option>
                        <option>Deluxe</option>
                    </select>
                    <select className={styles.inputField}>
                        <option>Person</option>
                        <option>1</option>
                        <option>2</option>
                        <option>4+</option>
                    </select>
                    <input type="date" className={styles.inputField}/>
                    <input type="date" className={styles.inputField}/>
                    <Link to={'/rooms'}>
                        <button className={styles.bookNowButton}>Book Now</button>
                    </Link>
                </div>
            </div>
            <section className={styles.facilitiesSection}>
                <h2 className={styles.title}>Our Facilities</h2>
                <p className={styles.subtitle}>
                    We offer modern (5-star) hotel facilities for your comfort.
                </p>

                <div className={styles.facilityGrid}>
                    {facilities.map((facility) => (
                        <div key={facility.id} className={styles.facilityCard}>
                            <img src={facility.image} alt={facility.name} className={styles.icon}/>
                            <p className={styles.facilityName}>{facility.name}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className={styles.roomsSection}>
            <h2 className={styles.title}>Luxurious Rooms</h2>
            <p className={styles.subtitle}>
                All rooms are designed for your comfort.
            </p>

            <div className={styles.roomsGrid}>
                {rooms.map((room) => (
                    <div key={room.id} className={styles.roomCard}>
                        <div className={styles.imageWrapper}>
                            <img src={room.image} alt="Room" className={styles.roomImage} />
                            <span className={styles.availability}>{room.availability}</span>
                        </div>
                        <p className={styles.description}>{room.description}</p>
                    </div>
                ))}
            </div>
        </section>
       <Footer/>
    </main>
    );
};

export default HeroPage;

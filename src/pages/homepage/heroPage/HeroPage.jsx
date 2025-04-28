import HeroImage from "../../../assets/heroImage.jpg";
import styles from "./HeroPage.module.css";
import Image from "../../../assets/makiSwimming0.png"
import Image2 from "../../../assets/Vector (1).png"
import Image3 from "../../../assets/Vector (2).png"
import Image4 from "../../../assets/Vector (3).png"
import Image5 from "../../../assets/Vector (4).png"
import Image6 from "../../../assets/Vector (5).png"
import Image7 from "../../../assets/Vector (6).png"
import Image8 from "../../../assets/Vector (7).png"

import ListOfHotel from "../listOfHotel/ListOfHotel.jsx";

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

const HeroPage = () => {
    return (
        <main className={styles.main}>
            <div className={styles.heroContainer}>
                <div className={styles.textSection}>
                    <h2 className={styles.subTitle}>Fortunae IT Hotel Booking App</h2>
                    <h1 className={styles.mainTitle}>
                        Discover Your Perfect Stay with Fortunae IT
                    </h1>
                    <p className={styles.Description}>
                        Book unforgettable hotel experiences tailored just for you—luxury, comfort, and joy await at every destination
                    </p>
                    <div className={styles.buttonContainer}>
                        <a href="/hotels" className={styles.bookNow}>
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
            <h2 className={styles.title}>Luxurious Hotels</h2>
            <p className={styles.subtitle}>
                All rooms are designed for your comfort.
            </p>
            <ListOfHotel/>
        </section>
    </main>
    );
};

export default HeroPage;

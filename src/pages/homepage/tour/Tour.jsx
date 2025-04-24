import Footer from "../../../component/footer";
import Navbar from "../../../component/navbar/Navbar";
import styles from "./Tour.module.css";
import clock from "../../../assets/img/room1.jpeg";
import bus from "../../../assets/img/hotel3.jpg";
import Image from "../../../assets/makiSwimming0.png";
import Image2 from "../../../assets/Vector (1).png";
import Image3 from "../../../assets/Vector (2).png";
import Image4 from "../../../assets/Vector (3).png";
import Image5 from "../../../assets/Vector (4).png";
import Image6 from "../../../assets/Vector (5).png";
import Image7 from "../../../assets/Vector (6).png";
import Image8 from "../../../assets/Vector (7).png";
import styles1 from "../heroPage/HeroPage.module.css";
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
const TourPage = () => {
    return (
        <main>
            <div className={styles.tourContainer}>
                <header className={styles.heroSection}>
                    <img src={clock} alt="Big Ben" className={styles.heroImage} />
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>Explore the Heart of Our Luxury Hotels</h1>
                        <p className={styles.subTitle}>
                            Join us on immersive hotel tours designed to captivate your senses and spark your
                            curiosity. Explore breathtaking destinations, experience local culture, and enjoy
                            the finest in comfort and hospitality—every step of the way is an adventure worth
                            remembering.

                        </p>
                    </div>
                </header>

                <section className={styles.tourSection}>
                    <div className={styles.imageWrapper}>
                        <img src={bus} alt="London Red Bus" className={styles.tourImage} />
                    </div>
                    <h2 className={styles.tourTitle}>Our Facilities</h2>
                    <div className={styles1.facilityGrid}>
                        {facilities.map((facility) => (
                            <div key={facility.id} className={styles1.facilityCard}>
                                <img src={facility.image} alt={facility.name} className={styles1.icon}/>
                                <p className={styles1.facilityName}>{facility.name}</p>
                            </div>
                        ))}
                    </div>
                    <h3 className={styles.experienceTitle}>Check out our Luxury Hotels</h3>
                    <ListOfHotel/>

                    <p className={styles.bookingDescription}>
                        Ready to explore? Reach out to our team for personalized itineraries and booking assistance.<br />
                        Contact us at <a href="mailto:tours@britishadventures.co.uk">tours@britishadventures.co.uk</a> or call <strong>+44 9876 543 210</strong>.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default TourPage;

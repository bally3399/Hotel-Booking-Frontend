import Footer from "../../../component/footer";
import Navbar from "../../../component/navbar/Navbar";
import styles from "./Tour.module.css";
import clock from "../../../assets/massimiliano-morosinotto-KFp49neKUuU-unsplash.jpg";
import bus from "../../../assets/aron-van-de-pol-tZDtyUrYrFU-unsplash.jpg";

const TourPage = () => {
    return (
        <main>
            <Navbar />
            <div className={styles.tourContainer}>
                <header className={styles.heroSection}>
                    <img src={clock} alt="Big Ben" className={styles.heroImage} />
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>Explore the Heart of Britain</h1>
                        <p className={styles.subTitle}>
                            Discover the timeless charm and vibrant spirit of the UK through our curated tours.
                            From iconic landmarks to hidden gems, embark on an unforgettable journey.
                        </p>
                    </div>
                </header>

                <section className={styles.tourSection}>
                    <div className={styles.imageWrapper}>
                        <img src={bus} alt="London Red Bus" className={styles.tourImage} />
                    </div>
                    <h2 className={styles.tourTitle}>Guided Tours & Experiences</h2>
                    <p className={styles.tourDescription}>
                        Whether you're strolling through the historic streets of London, exploring the scenic landscapes of the Lake District,
                        or immersing yourself in the cultural heritage of Edinburgh, our guided tours offer an authentic British experience.
                    </p>

                    <h3 className={styles.experienceTitle}>Experience the Best of Britain</h3>
                    <ul className={styles.experienceList}>
                        <li>Wander through centuries-old castles and grand estates.</li>
                        <li>Delight in afternoon tea at charming countryside inns.</li>
                        <li>Discover local stories from friendly, knowledgeable guides.</li>
                        <li>Experience the iconic red buses and picturesque cobbled streets.</li>
                    </ul>

                    <h3 className={styles.bookingTitle}>Book Your Tour</h3>
                    <p className={styles.bookingDescription}>
                        Ready to explore? Reach out to our team for personalized itineraries and booking assistance.<br />
                        Contact us at <a href="mailto:tours@britishadventures.co.uk">tours@britishadventures.co.uk</a> or call <strong>+44 9876 543 210</strong>.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    );
};

export default TourPage;

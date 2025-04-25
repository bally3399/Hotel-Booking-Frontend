import Navbar from "../../../component/navbar/Navbar";
import styles from "./About.module.css";
import Footer from "../../../component/footer";
import image from "../../../assets/img/room1.jpeg";

const About = () => {
    return (
        <main>
            <div className={styles.aboutContainer}>
                <header className={styles.heroSection}>
                    <img src={image} alt="Luxury British Room" className={styles.heroImage} />
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>Experience Comfort And Luxury</h1>
                        <p className={styles.subTitle}>
                            Step into a world where luxury meets tradition. Our rooms and suites are thoughtfully designed to blend timeless British charm 
                            with modern comfort. Discover the perfect sanctuary in the heart of the UK.
                        </p>
                    </div>
                </header>

                <section className={styles.descriptionSection}>
                    <h2 className={styles.sectionTitle}>Our Rooms and Suites</h2>
                    <p className={styles.sectionDescription}>
                        Each room reflects the rich heritage and sophistication of British culture, featuring custom interiors with classic decor and 
                        modern amenities. Whether it’s a cozy suite with a stunning city view or a grand room with regal touches, 
                        our spaces promise an unforgettable stay.
                    </p>

                    <h3 className={styles.featuresTitle}>Why Choose Us?</h3>
                    <ul className={styles.featuresList}>
                        <li>Luxurious rooms with elegant British decor</li>
                        <li>Exceptional comfort with plush bedding and stylish furnishings</li>
                        <li>Prime locations near iconic UK landmarks and attractions</li>
                        <li>Warm, personalized service that makes you feel at home</li>
                    </ul>

                    <p className={styles.inviteText}>
                        Whether you are visiting for leisure or business, our exquisite accommodations 
                        are designed to make your stay truly memorable. Discover the charm of British hospitality with us.
                    </p>
                </section>
            </div>
        </main>
    );
};

export default About;

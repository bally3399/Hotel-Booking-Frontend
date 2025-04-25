import Footer from "../../../component/footer";
import Navbar from "../../../component/navbar/Navbar";
import styles from "./contact.module.css";
import flag from "../../../assets/img/room3.jpg";
import street from "../../../assets/img/room1.jpeg";

const ContactPage = () => {
    return (
        <main>
            <div className={styles.contactContainer}>
                <header className={styles.heroSection}>
                    <img src={street} alt="Charming UK Street" className={styles.heroImage} />
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>Get in Touch</h1>
                        <p className={styles.subTitle}>
                            Experience the warmth of British hospitality and let us assist you with your inquiries.
                        </p>
                    </div>
                </header>

                <section className={styles.contactSection}>
                    <div className={styles.imageWrapper}>
                        <img src={flag} alt="UK Flag" className={styles.contactImage} />
                    </div>
                    <h2 className={styles.contactTitle}>We're Here to Help</h2>
                    <p className={styles.contactDescription}>
                        Whether you're planning your stay or just have a quick question,
                        our dedicated team is here to ensure your experience is nothing short of splendid.
                        Feel free to reach out to us through any of the following:
                    </p>

                    <h3 className={styles.phoneTitle}>Give Us a Ring</h3>
                    <p className={styles.phoneDescription}>
                        Call us on <strong>+44 1234 567 890</strong>. Our lines are open from 9 AM to 7 PM (GMT), Monday to Friday.
                    </p>

                    <h3 className={styles.emailTitle}>Drop Us an Email</h3>
                    <p className={styles.emailDescription}>
                        Send us a message at <a href="mailto:hello@britishstay.co.uk">hello@britishstay.co.uk</a>, and we'll respond promptly.
                    </p>

                    <h3 className={styles.visitTitle}>Visit Us</h3>
                    <p className={styles.visitDescription}>
                        Pop by our office at <strong>221B Baker Street, London</strong>—we'll be glad to welcome you with a warm cuppa!
                    </p>
                </section>
            </div>
        </main>
    );
};

export default ContactPage;

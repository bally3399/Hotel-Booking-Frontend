import styles from "./Navbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/tour", label: "Explore" },
        { path: "/rooms", label: "Rooms" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brandName}>Fortunaé IT Hotel MS</h1>

            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </div>

            <div className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
                {navLinks.map(({ path, label }) => (
                    <div key={path} className={styles.navItem} onClick={() => navigate(path)}>
                        {label}
                    </div>
                ))}
            </div>

            <div className={styles.desktopOnly} onClick={() => navigate("/register")}>
                <button onClick={() => navigate("/create-booking")} className={styles.getStarted}>Book now</button>
            </div>
        </nav>
    );
};

export default Navbar;

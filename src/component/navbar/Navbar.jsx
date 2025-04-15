import styles from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let role = null;
    const menuRef = useRef();
    const token = localStorage.getItem("token");
    if(token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.roles[0];
    }
    let path = "/";
    if(role) path = role === "ADMIN" ? "/admin-dashboard" : "/user-dashboard"
    const navLinks = [
        { path: path, label: "Home" },
        { path: "/tour", label: "Explore" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];

    const handleLogout = () => {
        setIsOpen(false);
        localStorage.clear();
        navigate("/login");
    };

    const handleNavClick = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isPublicPage =
        location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/about" &&
        location.pathname !== "/contact" &&
        location.pathname !== "/tour";


    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brandName}>Fortunaé IT Hotel MS</h1>

            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </div>

            <div
                ref={menuRef}
                className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}
            >
                {navLinks.map(({ path, label }) => (
                    <div
                        key={path}
                        className={styles.navItem}
                        onClick={() => handleNavClick(path)}
                    >
                        {label}
                    </div>
                ))}

                {isOpen && (
                    <button
                        className="bg-[#7c6a46] rounded-2xl p-5"
                        onClick={handleLogout}
                    >
                        {isPublicPage ? "Logout" : "Login"}
                    </button>
                )}
            </div>

            <div className={styles.desktopOnly}>
                {isPublicPage ? (
                    <button
                        className={styles.getStarted}
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                ) : (
                    <button className={styles.getStarted} onClick={handleLogout}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/navbar/Navbar";
import Footer from "../../../component/footer";
import styles from "./UserDashboard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
//import {jwtDecode }from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
const userId = 1;

  // Dummy JWT token and decoding
//   const token = "2345678098";
//   const decodedToken = jwtDecode(token);
//   const userId = decodedToken.userId;

  useEffect(() => {
    try {
      setLoading(true);
      // Dummy booking details
    //Api   http://hotel-api.fortunaelibrary-api.comapi/v1/bookings
      const dummyBookings = [
        { id: 1, name: "John Doe", room: "Deluxe Suite", date: "2025-02-20", status: "Confirmed" },
        { id: 2, name: "Jane Smith", room: "Standard Room", date: "2025-02-21", status: "Pending" },
        { id: 3, name: "Mike Ross", room: "Executive Suite", date: "2025-02-22", status: "Cancelled" },
      ];
      setBookings(dummyBookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = (e, booking) => {
    e.preventDefault();
    navigate("/edit-booking", { state: { booking } });
  };
  

  const handleCancelBooking = (e, bookingId) => {
    e.preventDefault();
    const response = axios.put(`http://hotel-api.fortunaelibrary-api.comapi/v1/bookings/cancel/${bookingId}?userId=${userId}`)
    
    alert(response);
    alert(`Booking with ID ${bookingId} cancelled!`);
  };

  return (
    <main>
      <Navbar />
      <div className={styles.dashboard}>
        <h2 className={styles.heading}>User Dashboard</h2>
        <button onClick={() => navigate("/create-booking")} className={styles.actionButton}>
          Create Booking
        </button>
        
        <div className={styles.bookingList}>
          {bookings.length === 0 ? (
            <p>No bookings available</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className={styles.bookingCard}>
                <h3>{booking.name}</h3>
                <p>Room: {booking.room}</p>
                <p>Date: {booking.date}</p>
                <p>Status: {booking.status}</p>
                <div className={styles.actionButtons}>
                  <button onClick={(e) => handleEdit(e, booking)} className={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={(e) => handleCancelBooking(e, booking.id)} className={styles.cancelButton}>
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Dashboard;

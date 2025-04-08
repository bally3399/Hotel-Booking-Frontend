import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../../component/navbar/Navbar";
import Footer from "../../../component/footer";
import styles from "./editBooking.module.css";
import axios from "axios";


const EditBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  const [bookingData, setBookingData] = useState({
    name: booking?.name || "",
    room: booking?.room || "",
    date: booking?.date || "",
    status: booking?.status || "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        const response = await axios.post("http://hotel-api.fortunaelibrary-api.comapi/v1/bookings/book", bookingData)
        
        if(response.status == 200){
            console.log("Success");
        }
    }catch(error){
        console.error(error);
    }finally{

        alert("Booking Updated Successfully!");
        console.log("Updated Booking Data:", bookingData);
        navigate("/user-dashboard");
    }
  };

  return (
    <main>
      <Navbar />
      <div className={styles.editBooking}>
        <h2>Edit Booking</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={bookingData.name}
            onChange={handleChange}
            required
          />

          <label>Room:</label>
          <input
            type="text"
            name="room"
            value={bookingData.room}
            onChange={handleChange}
            required
          />

          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={bookingData.date}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitButton}>
            Save Changes
          </button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default EditBooking;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../component/navbar/Navbar";
import Footer from "../../../component/footer";
import styles from "./createBooking.module.css";
import axios from "axios";


const CreateBooking = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    "userId": "12345",
    "roomId": 1001,
    "hotelId": 5001,
    "startDate": "2025-03-01",
    "endDate": "2025-03-05",
    "isPaid": true
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
    }
    alert("Booking Created Successfully!");
    console.log("Booking Data:", bookingData);
    navigate("/user-dashboard");
  };

  return (
    <main>
      <div className={styles.createBooking}>
        <h2>Create Booking</h2>
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
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateBooking;

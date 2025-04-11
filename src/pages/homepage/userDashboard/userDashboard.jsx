import ListOfHotel from "../listOfHotel/ListOfHotel.jsx";
import {useNavigate} from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();
    const handleOnClick = ()=>{
        navigate("/bookedRoom")
    }
  return (
    <main className="flex flex-col gap-10 mt-5">
        <div className="flex items-center justify-between p-6">
            <p className="self-center text-3xl font-bold text-[#7c6a46] font-sans">Welcome to Fortunaé IT Hotel MS</p>
            <button onClick={handleOnClick} className={`bg-[#7c6a46] text-white rounded-3xl py-2 px-6 hover:-translate-y-1 transition duration-300 self-center`}>view Booked room</button>
        </div>
        <ListOfHotel/>
    </main>
  );
};

export default Dashboard;

import ListOfHotel from "../listOfHotel/ListOfHotel.jsx";


const Dashboard = () => {

  return (
    <main className="flex flex-col gap-10 mt-10">
      <p className="self-center text-3xl font-bold text-[#7c6a46] font-sans">Welcome to Fortunaé IT Hotel MS</p>
      <ListOfHotel/>
    </main>
  );
};

export default Dashboard;

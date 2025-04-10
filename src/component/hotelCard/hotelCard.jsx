const HotelCard = ({ data,onClick }) => {
    return (
        <main className="flex items-start flex-col gap-3 md:w-[28%] w-[98%] mt-4 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 bg-white pb-5">
            <div className="rounded-t-3xl overflow-hidden">
                <img className="w-full h-[280px] md:h-[350px] object-cover" src={data?.img} alt="" />
            </div>
            <p className="text-3xl font-bold font-sans p-2">{data?.name}</p>
            <p className="text-xl font-sans px-2">{data?.description}</p>
            <p className="text-xl font-sans px-2">
                <span className="text-2xl font-bold">State: </span>{data?.state}
            </p>
            <p className="text-xl font-sans px-2">
                <span className="text-2xl font-bold">City: </span>{data?.location}
            </p>
            <button onClick={onClick} className="bg-[#7c6a46] text-white rounded-3xl py-2 px-6 hover:-translate-y-1 transition duration-300 self-center">
                View Hotel rooms
            </button>
        </main>
    );
};

export default HotelCard;

import Layout from "../component/layout/Layout";
import BookRoomPage from "../pages/homepage/booking/BookRoom";
import RoomsPage from "../pages/homepage/rooms/Rooms";
import Register from "../pages/homepage/register/Register";
import Login from "../pages/homepage/login/Login";
import TourPage from "../pages/homepage/tour/Tour";
import CreateHotel from "../pages/homepage/createHotel/CreateHotel";
import AdminDashboard from "../pages/homepage/adminDashboard/AdminDashboard";
import AddRoom from "../pages/homepage/AddRoom/Addroom";
import EditRoom from "../pages/homepage/editRoom/EditRoom";
import UserDashboard from "../pages/homepage/userDashboard/userDashboard";
import About from "../pages/homepage/about/About";
import RoomDetailsPage from "../pages/homepage/roomDetails/RoomDetails";
import ListOfHotelPage from "../pages/homepage/listOfHotel/ListOfHotel";
import CreateBooking from "../pages/homepage/createBooking/createBooking";
import EditBooking from "../pages/homepage/editBooking/editBooking";
import ContactPage from "../pages/homepage/contact/Contact";
import HotelCard from "../component/hotelCard/hotelCard";
import HeroPage from "../pages/homepage/heroPage/HeroPage.jsx";
import RoomCard from "../component/roomCard/roomCard.jsx";
import HotelDetails from "../pages/homepage/hotelDetails/hotelDetails.jsx";
import RegisterAdmin from "../pages/homepage/registerAdmin/RegisterAdmin.jsx";
import Payment from "../component/payment/payment.jsx";




export const ROUTES = [
    {
        path: "/",
        element: <Layout/>,
        children: [

            {
                path: "/",
                element: <HeroPage/>,
            },

            {
                path: "/register",
                element: <Register/>,
            },

            {
                path: "/admin/register",
                element: <RegisterAdmin/>,
            },

            {
                path: "/login",
                element: <Login/>,
            },

            {
                path: "/book",
                element: <BookRoomPage/>,
            },
            {
                path: "/rooms",
                element: <RoomsPage/>,
            },
            {
                path: "/tour",
                element: <TourPage/>,
            },
            {
                path: "/create-hotel",
                element: <CreateHotel/>,
            },

            {
                path: "/admin-dashboard",
                element: <AdminDashboard/>,
            },

            {
                path: "/user-dashboard",
                element: <UserDashboard/>,
            },

            {
                path: "/add-room",
                element: <AddRoom/>,
            },
            {
                path: "/edit-room",
                element: <EditRoom/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/roomDetails",
                element: <RoomDetailsPage/>,
            },

            {
                path: "/hotels",
                element: <ListOfHotelPage/>,
            },
            {
                path: "/create-booking",
                element: <CreateBooking/>
            },
            {
                path: "/edit-booking",
                element: <EditBooking/>
            },
            {
                path: "/hotel_card",
                element: <HotelCard/>
            },
            {
                path: "/contact",
                element: <ContactPage/>
            },
            {
                path: "/payment",
                element: <Payment/>
            },
            {
                path: "/room_card",
                element: <RoomCard/>
            }
            ,
            {
                path: "/hotel_details",
                element: <HotelDetails/>
            }
        ]
    }

]
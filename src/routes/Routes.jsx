import Layout from "../component/layout/Layout";
import BookRoomPage from "../pages/homepage/booking/BookRoom";
import RoomsPage from "../pages/homepage/rooms/Rooms";
import Register from "../pages/homepage/register/Register";
import Login from "../pages/homepage/login/Login";
import TourPage from "../pages/homepage/tour/Tour";
import CreateHotel from "../pages/homepage/createHotel/CreateHotel";
import AdminDashboard from "../pages/homepage/adminDashboard/AdminDashboard";
import UserDashboard from "../pages/homepage/userDashboard/userDashboard";
import HeroPage from "../pages/homepage/heroPage/HeroPage.jsx";
import RegisterAdmin from "../pages/homepage/registerAdmin/RegisterAdmin.jsx";
import AddRoom from "../pages/homepage/AddRoom/Addroom.jsx";
import EditRoom from "../pages/homepage/editRoom/EditRoom.jsx";
import About from "../pages/homepage/about/About.jsx";
import ListOfHotelPage from "../pages/homepage/listOfHotel/ListOfHotel.jsx";
import CreateBooking from "../pages/homepage/createBooking/createBooking.jsx";
import EditBooking from "../pages/homepage/editBooking/editBooking.jsx";
import HotelCard from "../component/hotelCard/hotelCard.jsx";
import ContactPage from "../pages/homepage/contact/Contact.jsx";
import Payment from "../component/payment/payment.jsx";
import RoomCard from "../component/roomCard/roomCard.jsx";
import HotelDetails from "../pages/homepage/hotelDetails/hotelDetails.jsx";
import RoomBookingPage from "../pages/homepage/roomDetails/RoomDetails.jsx";
import BookedRoom from "../pages/homepage/userDashboard/bookedRoom.js";
import GetHotelById from "../pages/homepage/getHotelById/GetHotelById.jsx";
import DeleteHotelById from "../pages/homepage/deleteHotelById/DeleteHotelById.jsx";
import DeactivateRoom from "../pages/homepage/deactivateRoom/DeactivateRoom.jsx";
import ActivateRoom from "../pages/homepage/activateRoom/ActivateRoom.jsx";
import FindAllAvailableRoomPage from "../pages/homepage/findAllAvailableRooms/FindAllAvailableRoom.jsx";
import CheckRoomAvailabilityPage from "../pages/homepage/checkRoomAvailability/CheckRoomAvailability.jsx";
import FilterByPriceAndLocationPage from "../pages/homepage/filteredByLocation/FilteredByLocation.jsx";
import FilterRoomByTypePage from "../pages/homepage/filterRoomByType/FilterRoomByType.jsx";
import DeleteRoomByIdPage from "../pages/homepage/deleteRoomById/DeleteRoomById.jsx";
import GetHotelsByLocationPage from "../pages/homepage/getHotelsByLocation/GetHotelsByLocation.jsx";
import GetTotalHotelsByLocationPage from "../pages/homepage/getTotalHotelsByLocation/GetTotalHotelsByLocation.jsx";
import UserBookedRoom from "../pages/homepage/roomDetails/userBookedRoom.jsx";
import AvailableRooms from "../pages/homepage/availableRoom/AvailableRoom.jsx";




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
                element: <RegisterAdmin/>
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
                path: "/get-total-hotels-by-location",
                element: <GetTotalHotelsByLocationPage/>
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
                path: "/user-booked",
                element: <UserBookedRoom/>,
            },
            {
                path: "/bookedRoom",
                element: <BookedRoom/>,
            },
            {
                path: "/roomDetails",
                element: <RoomBookingPage/>,
            },

            {
                path: "/available-rooms",
                element: <AvailableRooms/>,
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
            },

            {
                path: "/hotel_details",
                element: <HotelDetails/>
            },

            {
                path: "/get-hotel-by-id",
                element: <GetHotelById/>
            },

            {
                path: "/get-hotels-by-location",
                element: <GetHotelsByLocationPage/>
            },
            {
                path: "/delete-hotel-by-id",
                element: <DeleteHotelById/>
            },
            {
                path: "/deactivate-room-by-hotel-id",
                element: <DeactivateRoom/>
            },

            {
                path: "/activate-room-by-hotel-id",
                element: <ActivateRoom/>
            },
            {
                path: "/find-all-available-rooms",
                element: <FindAllAvailableRoomPage/>
            },
            {
                path: "/check-room-availability",
                element: <CheckRoomAvailabilityPage/>
            },
            {
                path: "filter-by-price-and-location",
                element: <FilterByPriceAndLocationPage/>
            },
            {
                path: "/filter-rooms-by-type",
                element: <FilterRoomByTypePage/>
            },

            {
                path: "/delete-room-by-id",
                element: <DeleteRoomByIdPage/>
            }


        ]
    }

]
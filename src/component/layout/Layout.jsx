import HeroPage from "../../pages/homepage/heroPage/HeroPage";
import {Outlet} from "react-router-dom";
import Footer from "../footer/index.jsx";
import Navbar from "../navbar/Navbar.jsx";



const Layout = () => {
    return (
        <>
            <div>
                <Navbar/>
                <Outlet/>
                <Footer/>
            </div>
        </>
    )
}
export default Layout
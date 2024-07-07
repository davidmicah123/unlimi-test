import "./Navbar.css";
import logo from "../../Assets/Images/logo.png";
import searchIcon from "../../Assets/Images/Shape.png";
import alertIcon from "../../Assets/Images/alert.png";
import userImg from "../../Assets/Images/user_img.png";
import vectorIcon from "../../Assets/Images/Vector.png";


function Navbar() {
    return(
        <nav className="navbar">
            <img src={logo} alt="logo" className="logo"/>

            <div className="nav_action_area">
                <div className="searchbar_wrapper">
                    <img src={searchIcon} className="search_icon" alt="search icon" />
                    <input className="search_input" placeholder="Search by patients" />
                </div>

                <div className="user_action_area">
                    <img src={alertIcon} alt="logo" className="alert_icon" />
                    <img src={userImg} alt="logo" />
                    <h3 className="usernmae">Deko</h3>
                    <img src={vectorIcon} alt="logo" />
                </div>
            </div>

        </nav>
    );
}

export default Navbar;
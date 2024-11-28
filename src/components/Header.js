import React, { useContext } from "react";
import bus from "../images/bus.png";
import { Link, useNavigate } from "react-router-dom";
import gear from "../images/gear.png";
import AccountContext from "../context/AccountContext";
import './Header.css'; // Import the Header CSS

function Header() {
    const context = useContext(AccountContext);
    const { logout, user } = context;  // Destructure logout and user from context

    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        logout()  // Call logout function from context
            .then(() => {
                console.log("Logged Out Successfully");
                navigate('/'); // Redirect to home page
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#">
                        <img src={bus} alt="Logo" width="45" height="40" />
                    </Link>
                    <Link id="brand_name" className="navbar-brand" to='/'>
                        Bus Management System
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link id="hover" className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link id="hover" className="nav-link active" to="/login">AdminLogin</Link>
                            </li>
                        </ul>
                        <div className="dropdown btn-group">
                            <img src={gear} className="gear" alt="gear" data-bs-toggle="dropdown" type="button" />
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;

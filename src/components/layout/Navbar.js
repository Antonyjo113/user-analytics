import React from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {

    const location = useLocation();

    return (
        <div className="nav-links">
        <Link to="/user" className={location.pathname === "/user" ? "active-link" : ""} >User</Link>
        <Link to="/analytics" className={location.pathname === "/analytics" ? "active-link" : ""} >Analytics</Link>
        </div>
    )
}

export default Navbar
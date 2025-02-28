import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {


    return (
        <>
        <Link to="/user">User</Link>
        <Link to="/analytics">Analytics</Link>
        </>
    )
}

export default Navbar

import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";



const Layout = () => {



    return (
        <div className="layout-wrapper" >
            <div className="navbar-wrapper primary-bg-clr" >
                <Navbar />
            </div>
            <div className="main-wrapper" >
                <Outlet />
            </div>
        </div>
    )

}

export default Layout

// import React from 'react'
import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/context.jsx";


const Navbar = () => {
    const { isLogin, setIsLogin } = useContext(AuthContext);
    const handelLogout = () => {
        if (confirm("Do you want to exit?")) {
            localStorage.removeItem("loginDetails");
            setIsLogin(false);
        }
    }

    return (
        <>

            <header className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex flex-wrap max-md:flex-row max-md:justify-between p-5 flex-col md:flex-row items-center">
                    <NavLink to={"/"} className="flex title-font font-medium items-center text-white mb-4 max-md:mb-0">
                        <img src="assets/horse.png" alt="logo" className=" invert w-8" />
                        <span className="ml-3 text-xl">AuthPortal</span>
                    </NavLink>
                    {isLogin ? <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <NavLink to={"/profile"} className="mr-5 hover:text-white">Profile</NavLink>
                        <NavLink to={"/"} className="mr-5 hover:text-white" onClick={handelLogout}>logout</NavLink>
                    </nav> : <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <NavLink to={"/verifyEmail"} className="mr-5 hover:text-white">Signup</NavLink>
                        <NavLink to={"/login"} className="mr-5 hover:text-white">Login</NavLink>
                    </nav>}
                </div>
            </header>

        </>
    )
}

export default Navbar
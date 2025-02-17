import { NavLink, useNavigate } from "react-router-dom"
import {assets} from "../assets/assets.js"
import { useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();

    // const [showmenu, setshowmenu] = useState(false);
    const [token, settoken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
        <img src={assets.logo} onClick={() => navigate("/")} alt="logo" className="w-44 cursor-pointer " />
        <ul className="hidden md:flex items-start gap-5 font-medium ">
            <NavLink to="/">
                <li className="py-1">HOME</li>
                <hr className="bg-blue-500 h-0.5 border-none rounded-full hidden"/>
            </NavLink>
            <NavLink to="/doctors">
                <li className="py-1">ALL DOCTORS</li>
                <hr className="bg-blue-500 h-0.5 border-none rounded-full hidden"/>
            </NavLink>
            <NavLink to="/about">
                <li className="py-1">ABOUT</li>
                <hr className="bg-blue-500 h-0.5 border-none rounded-full hidden"/>
            </NavLink>
            <NavLink to="contact">
                <li className="py-1">CONTACT</li>
                <hr className="bg-blue-500 h-0.5 border-none rounded-full hidden"/>
            </NavLink>
        </ul>
        <div className="flex items-center gap-4">
            {token ? 
                <div className="flex items-center gap-2 cursor-pointer group relative">
                    <img className="w-10 rounded-full" src={assets.profile_pic} alt="pp" />
                    <img className="w-2.5" src={assets.dropdown_icon} alt="di"/>
                    <div className="absolute top-0 right-0 pt-15 text-base font-medium text-gray-600 hidden group-hover:block">
                        <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                            <p className="hover:text-black cursor-pointer" onClick={() => navigate("/my-profile")}>My Profile</p>
                            <p className="hover:text-black cursor-pointer" onClick={() => navigate("/my-appointments")}>My Appointments</p>
                            <p className="hover:text-black cursor-pointer" onClick={() => settoken(false)}>Logout</p>
                        </div>
                    </div>
                </div>
            :<button className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full cursor-pointer font-light hidden md:block" onClick={() => navigate("/login")}>Create Account</button>
            }
        </div>
    </div>
  )
}

export default Navbar
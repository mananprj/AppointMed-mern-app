import { useContext } from "react"
import { assets } from "../assets/assets"
import { AdminContext } from "../context/AdminContext"
import {useNavigate} from "react-router-dom"
import { DoctorContext } from "../context/DoctorContext"

const Navbar = () => {

    const {aToken, setaToken} = useContext(AdminContext);
    const {dtoken, setdtoken} = useContext(DoctorContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
        aToken && setaToken("");
        aToken && localStorage.removeItem("aToken");
        dtoken && setdtoken("");
        dtoken && localStorage.removeItem("dtoken");
    }

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white ">
        <div className="flex items-center gap-5 text-sm ">
            <img onClick={() => navigate("/")} className="w-40 cursor-pointer" src={assets.admin_logo} alt="" />
            <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">{aToken ? "Admin" : "Doctor"}</p>
        </div>
        <button onClick={logout} className="bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full font-medium cursor-pointer">Logout</button>
    </div>
  )
}

export default Navbar
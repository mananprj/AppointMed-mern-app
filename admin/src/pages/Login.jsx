import { useContext, useState } from "react"
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios"
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {

    const [state, setstate] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {setaToken, backendurl} = useContext(AdminContext);
    const {setdtoken} = useContext(DoctorContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            
            if(state === "Admin"){
                const res = await axios.post(`${backendurl}/api/admin/login`, {email, password});
                if(res.data.success){
                    localStorage.setItem("aToken", res.data.token);
                    setaToken(res.data.token);
                    toast.success(res.data.message);
                }else{
                    toast.error(res.data.message);
                }

                console.log(res);
            }else{
                const res = await axios.post(`${backendurl}/api/doctor/login`, {email, password});
                if (res.data.success) {
                    localStorage.setItem("dtoken", res.data.token);
                    setdtoken(res.data.token); 
                    toast.success(res.data.message);
                }else{
                    toast.error(res.data.message);
                }

                console.log(res);
            }

        } catch (error) {
            console.log(error);
        }
    }
 
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] shadow-lg text-sm">
            <p className="text-2xl font-semibold m-auto "> <span className="text-[#5F6FFF]"> {state} </span> Login </p>
            <div className="w-full">
                <p className="font-semibold text-sm">Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required/>
            </div>
            <div className="w-full">
                <p className="font-semibold text-sm">Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required/>
            </div>
            <button className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer ">Login</button>
            {
                state === "Admin" ? <p>Doctor Login? <span className="text-[#5F6FFF] underline cursor-pointer" onClick={() => setstate("Doctor")}>Click here</span></p> :
                                    <p>Admin Login? <span className="text-[#5F6FFF] underline cursor-pointer" onClick={() => setstate("Admin")}>Click here</span></p>
            }
        </div> 
    </form>
  )
}

export default Login
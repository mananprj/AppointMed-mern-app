import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [state, setstate] = useState("Signup");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const {token, setToken, backendurl} = useContext(AppContext);

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {

        if(state === "Signup"){
          const res = await axios.post(`${backendurl}/api/user/register`, {name, email, password});

          if(res.data.success){
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
          }else{
            toast.error(res.data.message);
          }

        }else{
          const res = await axios.post(`${backendurl}/api/user/login`, {email, password});

          if(res.data.success){
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
          }else{
            toast.error(res.data.message);
          }
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }
  
  useEffect(() => {
    if(token){
        navigate("/");
    }
},[token])


  return (
    <form onSubmit={handleSubmit} className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-600 text-sm shadow shadow-gray-400">
          <p className="text-2xl font-semibold ">{state === "Signup" ? "Create Account" : "Login"}</p>
          <p>Please {state === "Signup" ? "Sign up" : "login"} to book Appointment</p>

          {state === "Signup" && <div className="w-full">
            <p className="font-semibold">Full Name</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1 " type="text" value={name} onChange={(e) => setname(e.target.value)} required/>
          </div>}
          <div className="w-full">
            <p className="font-semibold">Email</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1 " type="email" value={email} onChange={(e) => setemail(e.target.value)} required/>
          </div>
          <div className="w-full">
            <p className="font-semibold">Password</p>
            <input className="border border-zinc-300 rounded w-full p-2 mt-1 " type="password" value={password} onChange={(e) => setpassword(e.target.value)} required/>
          </div>
          <button type="submit" className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer mt-2">{state === "Signup" ? "Create Account" : "Login"}</button>
          {
            state === "Signup" ? 
            <p>Already have an Account? <span onClick={() => setstate("Login")} className="text-[#5f6FFF] underline cursor-pointer">Login here</span></p>
            : <p>Create an new account? <span onClick={() => setstate("Signup")}  className="text-[#5f6FFF] underline cursor-pointer">click here</span></p>
          }
      </div>
    </form>
  )
}

export default Login
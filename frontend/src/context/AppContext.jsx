import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = "$";
    const backendurl = (import.meta.env.VITE_PRODUCTION == "true") ? import.meta.env.VITE_BACKEND_URL : import.meta.env.VITE_DEPLOYMENT_URL;
    const [doctors, setdoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
    const [userdata, setuserData] = useState(false);

    const getDoctorsData = async () => {
        try {

            const res = await axios.get(`${backendurl}/api/doctor/list`);
            if(res.data.success){
                setdoctors(res.data.doctors);
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const loadUserProfileUserData = async () => {

        try {

            const res = await axios.get(`${backendurl}/api/user/get-profile`, {headers: {token}});
            if(res.data.success){
                setuserData(res.data.userdata);
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getDoctorsData();
    },[]);

    useEffect(() => {
        if(token){
            loadUserProfileUserData();
        }else{
            setuserData(false);
        }
    },[token])

    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token,setToken,
        backendurl,
        userdata, setuserData,
        loadUserProfileUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
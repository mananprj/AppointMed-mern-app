import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendurl = (import.meta.env.VITE_PRODUCTION == "true") ? import.meta.env.VITE_BACKEND_URL : import.meta.env.VITE_DEPLOYMENT_URL;

    const [dtoken, setdtoken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");
    const [appointments, setappointments] = useState([]);
    const [dashData, setdashData] = useState(false);
    const [profiledata, setprofiledata] = useState(false);

    const getAppointments = async (e) => {
        e?.preventDefault();
        try {
            const res = await axios.get(`${backendurl}/api/doctor/appointments`, {headers:{dtoken}});

            if(res.data.success){
                setappointments(res.data.appointments.reverse());
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {

            const res = await axios.post(`${backendurl}/api/doctor/complete-appointment`, {appointmentId}, {headers:{dtoken}});

            if(res.data.success){
                toast.success(res.data.message);
                getAppointments();
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);          
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {

            const res = await axios.post(`${backendurl}/api/doctor/cancel-appointment`, {appointmentId}, {headers:{dtoken}});

            if(res.data.success){
                toast.success(res.data.message);
                getAppointments();
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);          
        }
    }

    const getDashboardData = async () => {
        try {

            const res = await axios.get(`${backendurl}/api/doctor/doctor-dashboard`, {headers:{dtoken}});

            if(res.data.success){
                setdashData(res.data.dashData);
                console.log(res.data.dashData);
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);                     
        }
    }

    const getDoctorProfile = async () => {
        try {
            const res = await axios.get(`${backendurl}/api/doctor/doctor-profile`, {headers:{dtoken}});

            if(res.data.success){
                setprofiledata(res.data.doctorData);
                console.log(res.data.doctorData);
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) { 
            console.log(error);
            toast.error(error.message);                             
        }
    }

    const value = {
        dtoken,
        setdtoken,
        backendurl,
        appointments,
        setappointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setdashData,
        getDashboardData,
        getDoctorProfile,
        profiledata,
        setprofiledata,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;
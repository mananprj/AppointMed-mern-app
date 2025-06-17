import { createContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setaToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
    const [doctors, setdoctors] = useState([]);
    const [appointments, setappointments] = useState([]);
    const [dashData, setdashData] = useState(false);

    const backendurl = (import.meta.env.VITE_PRODUCTION == "true") ? import.meta.env.VITE_BACKEND_URL : import.meta.env.VITE_DEPLOYMENT_URL;

    const getAllDoctors = async () => {
        try {

            const res = await axios.post(`${backendurl}/api/admin/all-doctors`,{}, {headers : {aToken}});

            if(res.data.success){
                setdoctors(res.data.doctors);
                console.log(res.data.doctors);
            }else{
                toast.error(res.data.message);
            } 

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const changeAvailability = async (docId) => {

        try {

            const res = await axios.post(`${backendurl}/api/admin/change-availability`,{docId}, {headers: {aToken}} );
            if(res.data.success){
                toast.success(res.data.message);
                getAllDoctors();
            }else{
                toast.error(res.data.message);
            } 
            
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const getAllAppointments = async () => {

        try {

            const res = await axios.get(`${backendurl}/api/admin/appointments`, {headers: {aToken}});
            if(res.data.success){
                setappointments(res.data.appointments);
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appId) => {
        try {

            const res = await axios.post(`${backendurl}/api/admin/cancel-appointment`, {appointmentId: appId}, {headers: {aToken}});
            if(res.data.success){
                toast.success(res.data.message);
                getAllAppointments();
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message); 
        }
    }

    const getDashdData = async () => {
        try {

            const res = await axios.get(`${backendurl}/api/admin/dashboard`, {headers: {aToken}});      
            if(res.data.success){
                setdashData(res.data.dashData);
                console.log(res.data.dashData);
                getAllAppointments();
            }else{
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);            
        }
    }

    const value = {
        aToken, setaToken, backendurl, doctors, getAllDoctors, changeAvailability, getAllAppointments, appointments, setappointments, cancelAppointment, getDashdData, dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
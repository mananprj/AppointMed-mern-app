import { createContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setaToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");

    const [doctors, setdoctors] = useState([]);

    const backendurl = import.meta.env.VITE_BACKEND_URL;

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

    const value = {
        aToken, setaToken, backendurl, doctors, getAllDoctors
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import {assets} from "../../assets/assets.js";

const AllAppointment = () => {

  const {aToken, getAllAppointments, appointments, cancelAppointment} = useContext(AdminContext);
  const {ageCalculate, currency} = useContext(AppContext);


  useEffect(() => {
    if(aToken){
      getAllAppointments();
    }
  },[aToken]);

  return (
    <div className="w-full max-w-6xl m-5">

      <p className="mb-3 text-lg font-medium ">All Appointments</p>

      <div className="bg-white shadow shadow-gray-300 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-screen"> 
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((appointment, index) => (
          <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50" key={index}>
            <p className="max-sm:hidden">{index+1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={appointment.userdata.image} alt="" /> <p>{appointment.userdata.name}</p>
            </div>
            <p className="max-sm:hidden">{ageCalculate(appointment.userdata.dob)}</p>
            <p>{appointment.slotdate}, {appointment.slottime}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full bg-gray-200" src={appointment.docdata.image} alt="" /> <p>{appointment.docdata.name}</p>
            </div>
            <p>{currency}{appointment.amount}</p>
            {appointment.cancelled ? <p className="text-red-400 text-sm font-medium">Cancelled</p> : appointment.iscompleted ? <p className="text-green-500 text-sm font-medium">Completed</p> : <img onClick={() => cancelAppointment(appointment._id)} className="w-8" src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointment
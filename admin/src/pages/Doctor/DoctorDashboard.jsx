import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets.js"
import { AppContext } from "../../context/AppContext.jsx";

const DoctorDashboard = () => {

  const { dashData, getDashboardData, dtoken, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashboardData();
    }
  }, [dtoken]);

  return dashData && (
    <div className="m-5">
      <div className="flex flex-wrap gap-4">

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-2xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{currency}{dashData.earning}</p>
            <p className="text-gray-400">Ernings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-2xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded-2xl border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all ">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border-gray-200 border-2">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Booking</p>
        </div>

        <div className="pt-4 border-2 border-t-0 border-gray-200">
          {dashData.latestAppointments.map((appointment, index) => (
            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
              <img className="rounded-full w-10" src={appointment.userdata.image} alt="" />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{appointment.userdata.name}</p>
                <p className="text-gray-600">{appointment.slotdate}</p>
              </div>
              {appointment.cancelled ? <p className="text-red-500">Cancelled</p> : appointment.iscompleted ? <p className="text-green-500">Completed</p>
                            :
                            <div className="flex">
                              <img className="w-10 cursor-pointer " src={assets.cancel_icon} alt="" onClick={() => cancelAppointment(appointment._id)} />
                              <img className="w-10 cursor-pointer " src={assets.tick_icon} alt="" onClick={() => completeAppointment(appointment._id)} />
                            </div>}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
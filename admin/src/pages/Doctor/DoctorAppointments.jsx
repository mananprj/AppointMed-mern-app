import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const DoctorAppointments = () => {

  const { dtoken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { ageCalculate, currency } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border-2 border-gray-300 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll ">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b-2 border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b-2 border-gray-300 hover:bg-gray-50" key={index}>
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={item.userdata.image} alt="" /> <p>{item.userdata.name}</p>
            </div>
            <div className="text-sm inline border border-[#5F6FFF] text-center w-[50%] px-2 rounded-full">
              <p>{item.payment ? "Online" : "Cash"}</p>
            </div>
            <p className="max-sm:hidden">{ageCalculate(item.userdata.dob)}</p>
            <p>{item.slotdate}, {item.slottime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className="text-red-500">Cancelled</p> : item.iscompleted ? <p className="text-green-500">Completed</p>
              :
              <div className="flex">
                <img className="w-10 cursor-pointer " src={assets.cancel_icon} alt="" onClick={() => cancelAppointment(item._id)} />
                <img className="w-10 cursor-pointer " src={assets.tick_icon} alt="" onClick={() => completeAppointment(item._id)} />
              </div>}

          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
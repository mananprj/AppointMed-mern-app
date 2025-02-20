import { useContext } from "react"
import { AppContext } from "../context/AppContext"

const Myappointments = () => {
  const {doctors} = useContext(AppContext);

  return (
    <div className="mb-70">
        <p className="pb-3 mt-12 text-xl font-medium text-zinc-700 border-b">My Appointments</p>
        <div>
          {doctors.slice(0,1).map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_2fr] sm:flex gap-4 py-2 border-b">
              <div>
                <img className="w-32 bg-blue-100 rounded-sm" src={item.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-700 ">
                <p className="text-neutral-800 font-semibold ">{item.name}</p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-sm">{item.address.line1}</p>
                <p className="text-sm">{item.address.line2}</p>
                <p className="text-sm mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time: </span>20, Feb, 2025 | 12:00 PM</p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end ">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 cursor-pointer">Pay Online</button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer">Cancle Appointment</button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Myappointments
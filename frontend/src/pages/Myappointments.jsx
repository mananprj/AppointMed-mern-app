import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const Myappointments = () => {
  const {backendurl, token, getDoctorsData} = useContext(AppContext);
  const[appointments, setappointments] = useState([]);

  const navigate = useNavigate();

  const getusersappointments = async () => {
    try {

      const res = await axios.get(`${backendurl}/api/user/appointments`, {headers: {token}});

      if(res.data.success){
        setappointments(res.data.appointments.reverse());
        console.log(res.data.appointments);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const cancelappointment = async (appointmentId) => {
    try {

      const res = await axios.post(`${backendurl}/api/user/cancel-appointment`, {appointmentId}, {headers: {token}});

      if(res.data.success){
        toast.success(res.data.message);
        getusersappointments();
        getDoctorsData();
      }else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Payment for Appointment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async function(response) {
        console.log(response);
        try {

          const res = await axios.post(`${backendurl}/api/user/verify-razorpay`, response, {headers: {token}});

          if(res.data.success){
            toast.success(res.data.message);
            getusersappointments();
            navigate("/my-appointments");
          }else{
            toast.error(res.data.message);
          }
          
        } catch (error) {
          console.log(error);
        }
      }
  }

  const rzp = new window.Razorpay(options);
  rzp.open();
}


  const appointmentpayment = async (appointmentId) => {
    try {

      const res = await axios.post(`${backendurl}/api/user/payment-razorpay`, {appointmentId}, {headers: {token}});

      if(res.data.success){
        initPay(res.data.order);
      }else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message); 
    }
  }

  useEffect(() => {
    if(token){
      getusersappointments();
    }
  },[token]);

  return (
    <div className="mb-70">
        <p className="pb-3 mt-12 text-xl font-medium text-zinc-700 border-b">My Appointments</p>
        <div>
          {appointments.map((item, index) => (
            <div key={index} className="grid grid-cols-[1fr_2fr] sm:flex gap-4 py-2 border-b">
              <div>
                <img className="w-32 bg-blue-100 rounded-sm" src={item.docdata.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-700 ">
                <p className="text-neutral-800 font-semibold ">{item.docdata.name}</p>
                <p>{item.docdata.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-sm">{item.docdata.address.line1}</p>
                <p className="text-sm">{item.docdata.address.line2}</p>
                <p className="text-sm mt-1"><span className="text-sm text-neutral-700 font-medium">Date & Time: </span>{item.slotdate} | {item.slottime}</p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end ">
              {!item.cancelled && item.payment && !item.iscompleted && <button className="sm:min-w-48 py-2 border rounded text-white bg-indigo-300">Paid</button>}
              {!item.cancelled && !item.payment && !item.iscompleted && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 cursor-pointer" onClick={() => appointmentpayment(item._id)}>Pay Online</button>}
              {!item.cancelled && !item.iscompleted && <button className="text-sm  text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer" onClick={() => cancelappointment(item._id)}>Cancle Appointment</button>}
              {item.cancelled && !item.iscompleted && <p className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500 text-center">Appointment Cancelled</p>}
              {item.iscompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Myappointments
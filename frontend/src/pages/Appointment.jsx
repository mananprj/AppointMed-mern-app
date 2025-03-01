import { useContext, useEffect, useState } from "react"
import {useParams} from  "react-router-dom"
import {AppContext} from "../context/AppContext.jsx"
import { assets } from "../assets/assets.js";
import RelatedDoctor from "../components/RelatedDoctor.jsx";

const Appointment = () => {
  const {docId} = useParams();
  const {doctors, currencySymbol} = useContext(AppContext);
  const daysOfWeeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docinfo, setdocinfo] = useState(null);
  const [docslots, setdocslots] = useState([]);
  const [slotindex, setslotindex] = useState(0);
  const [slottime, setslottime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setdocinfo(docInfo);
    console.log(docInfo);
  }

  const getAvailableSlots = async () => {
    setdocslots([]);

    // getting current date
    let today = new Date();

    for(let i=0; i<7; i++){
      let currentdate = new Date(today);
      currentdate.setDate(today.getDate()+i);

      let endtime = new Date();
      endtime.setDate(today.getDate()+i);
      endtime.setHours(23,0,0,0);

      if(today.getDate() === currentdate.getDate()){
        currentdate.setHours(currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10);
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0);
      }else{
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }

      let timeslots = []

      while(currentdate < endtime){
        let formatedtime = currentdate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", });

        timeslots.push({
          datetime: new Date(currentdate),
          time: formatedtime
        })

        currentdate.setMinutes(currentdate.getMinutes() + 30);
      }

      setdocslots(prev => ([...prev, timeslots]));
    }
  }

  useEffect(() => {
    fetchDocInfo();
  },[doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  },[docinfo]);

  useEffect(() => {
    console.log(docslots);
  },[docslots])


  return docinfo && (
    <div>
          {/* doctors details  */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img className="bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg" src={docinfo.image} alt="" />
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[10px] sm:mt-0">
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900 ">{docinfo.name} <img className="w-5" src={assets.verified_icon} alt="" /></p>

              <div className="flex items-center gap-2 text-sm mt-2 text-gray-600">
                <p>{docinfo.degree} - {docinfo.speciality}</p>
                <button className="py-0.5 px-2 border text-xs rounded-full ">{docinfo.experience}</button>
              </div>

              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="" /></p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-2">{docinfo.about}</p>
              </div>

              <p className="text-gray-700  font-medium mt-5">Appointment Fees: <span className="text-gray-900">{currencySymbol}{docinfo.fees}</span></p>
            </div>
          </div>

          {/* booking slots */}
          <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
              <p>Booking Slots</p>
              <div className="flex gap-5 items-center w-full overflow-x-scroll mt-5">
                {docslots.length && docslots.map((item, index) => (
                  <div onClick={() => setslotindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? "bg-[#5f6FFF] text-white" : "border border-gray-400"}`} key={index}>
                    <p>{item[0] && daysOfWeeks[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 w-full overflow-x-scroll mt-5">
                  {docslots.length && docslots[slotindex].map((item, index) => (
                    <p onClick={() => setslottime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slottime ? "bg-[#5f6FFF] text-white" : "text-gray-600 border border-gray-400 "}`} key={index}>
                        {item.time.toLowerCase()}
                    </p>
                  ))}
              </div>

              <button className="bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer" >Book an Appointment</button>
          </div>

          {/* Listing related Doctors  */}
          <RelatedDoctor docId={docId} speciality={docinfo.speciality}/>

    </div>
  )
}

export default Appointment
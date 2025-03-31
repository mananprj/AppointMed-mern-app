import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";

const RelatedDoctor = ({docId, speciality}) => {

    const{doctors} = useContext(AppContext);
    const [reldoc, setreldoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
            setreldoc(doctorsData);
        }
    },[doctors,speciality,docId]);

  return (
    <div className="flex flex-col gap-4 items-center my-16 text-gray-800 md:mx-10">
        <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
        <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted Doctors.</p>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
            {reldoc.slice(0,5).map((item, index) => (
                <div key={index} onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className="shadow shadow-gray-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                    <img className="bg-blue-50" src={item.image} alt="" />
                    <div className="p-4 ">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
                        <p className={`w-2 h-2 ${item.available ?  "bg-green-500" :  "bg-red-500" } rounded-full`}></p><p className={`${item.available ?  "text-green-500" :  "text-red-500" }`}>{item.available ? "Available" : "Not Available"}</p>
                        </div>
                        <p className="text-gray-900 text-lg font-medium ">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={() => {navigate("/doctors"); scrollTo(0,0);}} className="bg-[#5f6FFF] text-white cursor-pointer px-12 py-3 rounded-full mt-10">more</button>
    </div>
  )
}

export default RelatedDoctor
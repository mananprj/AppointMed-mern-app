import { useContext, useEffect, useState } from "react"
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {

  const { getDoctorProfile, setprofiledata, profiledata, dtoken, backendurl} = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isedit, setisedit] = useState(false);

  const updateProfile = async () => {
    try {
      const updatedata = {
        address: profiledata.address,
        available: profiledata.available,
        fees: profiledata.fees,
      }

      const res = await axios.post(`${backendurl}/api/doctor/update-profile`, updatedata, {headers:{dtoken}})

      if (res.data.success) {
        toast.success(res.data.message);
        setisedit(false);
        getDoctorProfile();
      }else{
        toast.error(res.data.message);
      }
      
    } catch (error) {
      console.log(error); 
      toast.error(error.message);   
    }
  }

  useEffect(() => {
    if (dtoken) {
      getDoctorProfile();
    }
  }, [dtoken]);

  return profiledata && (
    <div>

      <div className="flex flex-col gap-4 m-5">

        <div>
          <img className="bg-[#5F6FFF]/80 w-full sm:max-w-60 rounded-lg " src={profiledata.image} alt="" />
        </div>

        <div className="flex-1 rounded-lg px-5 bg-white">

          {/* ----Doc info ---- */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-700">{profiledata.name}</p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>{profiledata.degree} - {profiledata.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{profiledata.experience}</button>
          </div>

          {/* ----Doc about ---- */}
          <div>
            <p className="flex items-center gap-1 text-md font-medium text-neutral-800 mt-3">About:</p>
            <p className="text-sm text-gray-600 max-w-[800px] mt-1">{profiledata.about}</p>
          </div>

          <p className="text-gray-600 font-medium mt-3">Appointment Fee: <span className="text-gray-800d">{currency}{isedit ? <input type="number" onChange={(e) => setprofiledata(prev => ({...prev, fees:e.target.value}))} value={profiledata.fees}/> : profiledata.fees}</span></p>

          <div className="flex gap-2 py-2">
            <p className="font-medium text-gray-600">Address: </p>
            <p className="text-sm text-gray-600">
              {isedit ? <input type="text" onChange={(e) => setprofiledata(prev => ({...prev,address:{...prev.address, line1:e.target.value}}))} value={profiledata.address.line1}/> :profiledata.address.line1} 
              <br /> 
              {isedit ? <input type="text" onChange={(e) => setprofiledata(prev => ({...prev,address:{...prev.address, line2:e.target.value}}))} value={profiledata.address.line2}/> :profiledata.address.line2}
              </p>
          </div>

          <div className="flex gap-1 pt-2">
            <input onChange={() => isedit && setprofiledata(prev => ({...prev, available: !prev.available}))} checked={profiledata.available} type="checkbox" name=""/>
            <label className="font-medium text-gray-800">Available</label>
          </div>

          {isedit 
          ? <button onClick={updateProfile} className="px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-4 text-gray-600 font-medium hover:bg-[#5F6FFF] hover:text-white cursor-pointer transition-all">Save</button>
          : <button onClick={() => setisedit(true)} className="px-4 py-1 border border-[#5F6FFF] text-sm rounded-full mt-4 text-gray-600 font-medium hover:bg-[#5F6FFF] hover:text-white cursor-pointer transition-all">Edit</button>
          }

        </div>
      </div>

    </div>
  )
}

export default DoctorProfile
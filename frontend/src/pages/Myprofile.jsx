import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext";
import {assets} from "../assets/assets.js"
import { toast } from "react-toastify";
import axios from "axios";

const Myprofile = () => {
  
  const {userdata, setuserData, token, backendurl, loadUserProfileUserData } = useContext(AppContext);

  const [isEdit, setisEdit] = useState(false);
  const [image, setimage] = useState(false);

  const updateUserProfile = async () => {
    try {
      
      const formData = new FormData();
      formData.append("name", userdata.name);
      formData.append("phone", userdata.phone);
      formData.append("address", JSON.stringify(userdata.address));
      formData.append("dob", userdata.dob);
      formData.append("gender", userdata.gender);

      image && formData.append("image", image);

      const res = await axios.post(`${backendurl}/api/user/update-profile`, formData, {headers: {token}});

      if(res.data.success){
        toast.success(res.data.message);
        await loadUserProfileUserData();
        setisEdit(false);
        setimage(false);
      }else{
        toast.error(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  return userdata && (
    <div className="max-w-lg flex flex-col gap-2 text-sm ">

      {isEdit ? <label htmlFor="image">
                    <div className="inline-block relative cursor-pointer">
                      <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userdata.image} alt="" />
                      <img className="w-10 absolute bottom-12 right-12" src={image ? "" : assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setimage(e.target.files[0])} type="file" id="image" hidden/>
                </label> 
            :   <img className="w-36 rounded" src={userdata.image} alt="logo" />
      }

      {isEdit ? <input className="bg-gray-50 text-3xl font-medium max-w-60 mt-4" type="text" onChange={(e) => setuserData(prev => ({ ...prev, name: e.target.value }))} value={userdata.name}/> : <p className="font-medium text-3xl text-neutral-800 mt-4 ">{userdata.name}</p>}
      <hr className="bg-zinc-400 h-[1px] border-none"/>

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500 ">{userdata.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? <input className="bg-gray-100 max-w-52" type="text" onChange={(e) => setuserData(prev => ({ ...prev, phone: e.target.value }))} value={userdata.phone}/> : <p className="text-blue-400">{userdata.phone}</p>}
          <p className="font-medium">Address:</p>
          {isEdit ? <p>
            <input className="bg-gray-100" type="text" onChange={(e) => setuserData(prev => ( {...prev, address :{ ...prev.address, line1: e.target.value }}))} value={userdata.address.line1}/>
            <br />
            <input className="bg-gray-100" type="text" onChange={(e) => setuserData(prev => ({...prev, address :{ ...prev.address, line2: e.target.value }}))} value={userdata.address.line2}/>
          </p> : <p className="text-gray-600">
            {userdata.address.line1}
            <br />
            {userdata.address.line2}
          </p>}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 ">
            <p className="font-medium">Gender:</p>
            {isEdit ? <select className="bg-gray-100 max-w-20" onChange={(e) => setuserData(prev => ({ ...prev, gender: e.target.value }))} value={userdata.gender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select> : <p className="text-gray-600">{userdata.gender}</p>}
            <p className="font-medium">Birth Date:</p>
            {isEdit ? <input className="bg-gray-100 max-w-28" type="date" onChange={(e) => setuserData(prev => ({ ...prev, dob: e.target.value }))} value={userdata.dob}/> : <p className="text-gray-600">{userdata.dob}</p>}
        </div>
      </div>

      <div className="mt-8">
        {isEdit ? 
            <button className="text-white text-sm bg-[#5f6FFF] px-8 py-2 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer" onClick={updateUserProfile}>Save Information</button>
          : <button className="text-white text-sm bg-[#5f6FFF] px-8 py-2 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => setisEdit(true)}>Edit</button>}
      </div>
    </div>
  )
}

export default Myprofile
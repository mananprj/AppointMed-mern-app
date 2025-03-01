import { useContext, useState } from "react"
import { assets } from "../../assets/assets"
import { AdminContext } from "../../context/AdminContext"
import {toast} from "react-toastify"
import axios from "axios"

const AddDoctor = () => {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [about, setabout] = useState("");
    const [docimg, setdocimg] = useState(false);
    const [experience, setexperience] = useState("1 Year");
    const [fees, setfees] = useState("");
    const [speciality, setspeciality] = useState("General physician");
    const [degree, setdegree] = useState("");
    const [add1, setadd1] = useState("");
    const [add2, setadd2] = useState("");

    const {backendurl, aToken} = useContext(AdminContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            
            if(!docimg){
                return toast.error("Image not selected")
            }

            const formdata = new FormData();

            formdata.append("image", docimg);
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("experience", experience);
            formdata.append("fees", Number(fees));
            formdata.append("about", about);
            formdata.append("speciality", speciality);
            formdata.append("degree", degree);
            formdata.append("address", JSON.stringify({line1: add1, line2: add2}));

            formdata.forEach((val, key) => {
                console.log(`${key} : ${val}`);
            })

            const res = await axios.post(`${backendurl}/api/admin/add-doctor`, formdata, {headers: {aToken}});
            
            if(res.data.success){
                toast.success(res.data.message);
                setname("");
                setdocimg(false);
                setabout("");
                setdegree("");
                setadd1("");
                setadd2("");
                setemail("");
                setpassword("");
                setfees("");
            }else{
                toast.error(res.data.message);
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
      
    return (
        <form onSubmit={submitHandler} className="m-5 w-full ">
            <p className="mb-3 text-lg font-medium">Add Doctor</p>

            <div className="bg-white px-8 py-8 shadow shadow-gray-500 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500 ">
                    <label htmlFor="doc-img">
                        <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docimg ? URL.createObjectURL(docimg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={((e) => setdocimg(e.target.files[0]))} type="file" id="doc-img" hidden />
                    <p>Upload Doctor <br />Picture</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600 ">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Doctor Name</p>
                            <input onChange={(e) => setname(e.target.value)} value={name} className="border rounded px-3 py-2 border-gray-400" type="text" placeholder="Name" required />
                        </div> 

                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Doctor Email</p>
                            <input onChange={(e) => setemail(e.target.value)} value={email} className="border rounded px-3 py-2 border-gray-400" type="email" placeholder="Email" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Doctor Password</p>
                            <input onChange={(e) => setpassword(e.target.value)} value={password} className="border rounded px-3 py-2 border-gray-400" type="password" placeholder="Password" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Doctor Experience</p>
                            <select onChange={(e) => setexperience(e.target.value)} value={experience} className="border rounded px-3 py-2 border-gray-400" name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Fees</p>
                            <input onChange={(e) => setfees(e.target.value)} value={fees} className="border rounded px-3 py-2 border-gray-400" type="text" placeholder="Fees" required />
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Speciality</p>
                            <select onChange={(e) => setspeciality(e.target.value)} value={speciality} className="border rounded px-3 py-2 border-gray-400" name="" id="">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Education</p>
                            <input onChange={(e) => setdegree(e.target.value)} value={degree} className="border rounded px-3 py-2 border-gray-400" type="text" placeholder="Education" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Address</p>
                            <input onChange={(e) => setadd1(e.target.value)} value={add1} className="border rounded px-3 py-2 border-gray-400" type="text" placeholder="address 1" required />
                            <input onChange={(e) => setadd2(e.target.value)} value={add2} className="border rounded px-3 py-2 border-gray-400" type="text" placeholder="address 2" required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="mt-4 mb-2">About Doctor</p>
                    <textarea onChange={(e) => setabout(e.target.value)} value={about} className="w-full px-4 pt-2 border border-gray-400 rounded" placeholder="write about doctor" rows={5} required />
                </div>

                <button type="submit" className="bg-[#5F6FFF] px-10 py-3 mt-5 text-white rounded-full cursor-pointer">Add Doctor</button>
            </div>
        </form>
    )
}

export default AddDoctor
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as clodinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"

// API for adding doctor
export const addDoctor = async (req, res) => {

    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body;
        const imagefile = req.file;
        
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success: false, message: "Missing Details"});
        }

        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please Enter valid email"});
        }

        if(password.length < 8){
            return res.json({success: false, message: "Please enter atleast 8 digits password"});
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const imageupload = await clodinary.uploader.upload(imagefile.path, {resource_type: "image"})
        const imgurl = imageupload.secure_url;

        const doctordata = {name, email, image:imgurl, password:hashedpassword, speciality, degree, experience, about, fees, address:JSON.parse(address), date:Date.now()};

        const newdoctor = new doctorModel(doctordata);
        await newdoctor.save();

        return res.json({success: true, message: "Doctor added"})

    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
    }
}

// API for login admin

export const loginAdmin = async (req, res) => {

    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({success: true, message: "Token is created", token})

        } else {
            return res.json({success: false, message: "Invalid Admin Credentials"});
        }

    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
    }
}

// API to get all doctors 

export const alldoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select("-password");

        return res.json({success: true, doctors});
        
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
    }
}
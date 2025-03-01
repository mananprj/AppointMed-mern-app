import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary"

// API for signup user

export const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const userData = { name, email, password: hashpassword };

        const newuser = new userModel(userData);
        const user = await newuser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, user, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for user login

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, message: "User login successfully", token })
        }else{
            return res.json({success: false, message: "Invalid Credentials"});
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for fetch user data

export const getProfile = async (req, res) => {
    try {
        const {userId} = req.body;

        const userdata = await userModel.findById(userId).select("-password");
        return res.json({ success: true, userdata });   
        
    } catch (error) {   
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to update to user profile

export const updateProfile = async (req, res) => {
    try {

        const {userId, name, phone, address, dob, gender} = req.body;
        const imagefile = req.file;

        if(!name || !phone || !gender || !dob){
            return res.json({success: false, message: "Data Missing"});
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

        if(imagefile){
            const imageUpload = await cloudinary.uploader.upload(imagefile.path, {resource_type: "image"});
            const imageurl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, {image: imageurl})
        }

        return res.json({success: true, message: "Profile Updated"});
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

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
        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API for fetch user data

export const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;

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

        const { userId, name, phone, address, dob, gender } = req.body;
        const imagefile = req.file;

        if (!name || !phone || !gender || !dob) {
            return res.json({ success: false, message: "Data Missing" });
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender });

        if (imagefile) {
            const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
            const imageurl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imageurl })
        }

        return res.json({ success: true, message: "Profile Updated" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to book appointment

export const bookAppointment = async (req, res) => {
    try {

        const { userId, docId, slottime, slotdate } = req.body;

        const docdata = await doctorModel.findById(docId).select("-password");

        if (!docdata.available) {
            return res.json({ success: false, message: "Doctor is not available" });
        }

        let slots_booked = docdata.slots_booked;

        if (slots_booked[slotdate]) {
            if (slots_booked[slotdate].includes(slottime)) {
                return res.json({ success: false, message: "Slot is not available" });
            } else {
                slots_booked[slotdate].push(slottime);
            }
        } else {
            slots_booked[slotdate] = [];
            slots_booked[slotdate].push(slottime);
        }

        const userdata = await userModel.findById(userId).select("-password");

        delete docdata.slots_booked;

        const appointmentdata = {
            userId,
            docId,
            userdata,
            docdata,
            amount: docdata.fees,
            slottime,
            slotdate,
            date: Date.now()
        }

        const newAppointmnet = new appointmentModel(appointmentdata);
        await newAppointmnet.save();

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to get all appointments for frontend myappointments page

export const listAppointments = async (req, res) => {
    try {

        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });

        return res.json({ success: true, appointments }); ``

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment

export const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body;

        const appointmentdata = await appointmentModel.findById(appointmentId);

        //verify appointment user
        if (appointmentdata.userId != userId) {
            return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // realising the slot
        const { docId, slottime, slotdate } = appointmentdata;
        const docdata = await doctorModel.findById(docId).select("-password");
        let slots_booked = docdata.slots_booked;
        slots_booked[slotdate] = slots_booked[slotdate].filter(slot => slot != slottime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        return res.json({ success: true, message: "Appointment Cancelled" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// API to make payment of appointment using razorpay

export const makePayment = async (req, res) => {

    try {

        const { appointmentId } = req.body;
        const appointmentdata = await appointmentModel.findById(appointmentId);

        if (!appointmentdata || appointmentdata.cancelled) {
            return res.json({ success: false, message: "Invalid Appointment" });
        }

        // creating option for payment
        const options = {
            amount: appointmentdata.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options);

        return res.json({ success: true, order });


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to verify payment of appointment using razorpay

export const verifyPayment = async (req, res) => {
    try {

        const {razorpay_order_id} = req.body;
        const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        console.log(orderinfo);
        if(orderinfo.status === "paid"){
            await appointmentModel.findByIdAndUpdate(orderinfo.receipt, {payment: true});
            return res.json({success: true, message: "Payment Successfull"});
        }else{
            return res.json({success: false, message: "Payment Failed"});
        }
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });     
    }
}
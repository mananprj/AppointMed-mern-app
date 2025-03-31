import mongoose from "mongoose";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

export const changeAvailabality = async (req, res) => {
    try {

        const {docId} = req.body;
        const objectId = new mongoose.Types.ObjectId(docId)

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available});

        return res.json({success: true, message: "Availability Change"});
        
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
    }
}

export const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(["-password", "-email"]);
        res.json({success: true, doctors});
        
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});
    }
}

// API to doctor login

export const doctorLogin = async (req, res) => {
    try {

        const {email, password} = req.body;

        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success: false, message: "Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        
        if(isMatch){
            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET);
            return res.json({success: true, message: "Login Successfully", token});
        }else{
            return res.json({success: false, message: "Invalid Credentials"});
        }
        
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: error.message});   
    }
}

// API to get doctor Appointments

export const doctorAppointments = async (req, res) => {
    try {
        const { docId } = req.body;

        if (!docId) {
            return res.json({ success: false, message: "Doctor ID is required" });
        }

        const appointments = await appointmentModel.find({ docId });

        return res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to mark appointment as completed for doctor panel
export const completeAppointment = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentdata = await appointmentModel.findById(appointmentId);

        if(appointmentdata && appointmentdata.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {iscompleted: true});

            return res.json({ success: true, message: "Appointment marked as completed" });
        }else{
            return res.json({ success: false, message: "Appointment not found and mark failed" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment for doctor panel
export const cancelAppointment = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;

        const appointmentdata = await appointmentModel.findById(appointmentId);

        if(appointmentdata && appointmentdata.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true});

            return res.json({ success: true, message: "Appointment cancelled successfully" });
        }else{
            return res.json({ success: false, message: "Problem to cancel the appointment" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to get dashboard data for doctor panel
export const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;

        const appointments = await appointmentModel.find({ docId });
        let earning = 0;

        appointments.map((appointmentdata) => {
            if (appointmentdata.iscompleted || appointmentdata.payment) {
                earning += appointmentdata.amount;
            }
        })

        let patients = [];
        appointments.map((item) => {
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })

        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        return res.json({ success: true, dashData });
    
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to get doctor profile data for doctor panel
export const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;

        const doctorData = await doctorModel.findById(docId).select("-password");

        return res.json({ success: true, doctorData });
    
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

// API to update doctor profile data for doctor panel

export const updateDoctorProfile = async (req, res) => {
    try {
        const {docId, fees, address, available} = req.body;

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available});
        
        return res.json({ success: true, message: "Profile updated successfully" });
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });     
    }
}
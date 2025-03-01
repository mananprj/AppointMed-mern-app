import mongoose from "mongoose";
import doctorModel from "../models/doctorModel.js";

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
import express from "express";
import { cancelAppointment, completeAppointment, doctorAppointments, doctorDashboard, doctorList, doctorLogin, doctorProfile, updateDoctorProfile } from "../controllers/doctorController.js";
import { authDoctor } from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);

doctorRouter.post("/login", doctorLogin);

doctorRouter.get("/appointments", authDoctor, doctorAppointments);

doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);

doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);

doctorRouter.get("/doctor-dashboard", authDoctor, doctorDashboard);

doctorRouter.get("/doctor-profile", authDoctor, doctorProfile);

doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
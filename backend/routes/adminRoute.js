import express from "express"
import upload from "../middleware/multer.js";
import { addDoctor, alldoctors, loginAdmin } from "../controllers/doctorControllers.js";
import { authAdmin } from "../middleware/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin ,upload.single('image'), addDoctor);

adminRouter.post("/login", loginAdmin);

adminRouter.post("/all-doctors", authAdmin , alldoctors);

export default adminRouter;
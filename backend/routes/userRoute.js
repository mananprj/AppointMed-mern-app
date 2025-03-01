import express from "express"
import { getProfile, loginUser, register, updateProfile } from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);

userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

export default userRouter;
import express from "express"
import cors from "cors"
import connectDB from "./config/mongodb.js";
import "dotenv/config"
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/doctorRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint

app.use("/api/admin", adminRouter);


app.get("/", (req, res) => {
    res.send("API Working");
})

app.listen(port, () => {
    console.log("Server Started " + port);
})
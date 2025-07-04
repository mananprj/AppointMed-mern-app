import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongourl = process.env.MONGO_URI;
        await mongoose.connect(mongourl);
        console.log("mongoDB is connected to Database");
    } catch (error) {
        console.log("Error in establishing connection " + error);
    }
}

export default connectDB;
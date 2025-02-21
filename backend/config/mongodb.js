import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB is connected to Database");
    } catch (error) {
        console.log("Error in establishing connection " + error);
    }
}

export default connectDB;
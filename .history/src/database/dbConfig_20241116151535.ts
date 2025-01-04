import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URl!, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            connectTimeoutMS: 20000, // Increase timeout for connection
            socketTimeoutMS: 45000, // Increase timeout for queries
        );
            console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

export default connectDB;
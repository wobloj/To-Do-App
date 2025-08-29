import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async (uri: string): Promise<void> => {
    try {
        await mongoose.connect(uri);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}
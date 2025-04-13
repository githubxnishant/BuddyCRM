import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "crm",
        });
        console.log(`MOngoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
}

export default connectDB;
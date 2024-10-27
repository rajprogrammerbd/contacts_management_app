import mongoose from "mongoose";

const DB_URL = process.env.DATABASE_URL;
let isConnected = false;

if (!DB_URL) {
    throw new Error("DATABASE_URL is undefined");
}

const connectDb = async () => {
    try {
        if (isConnected) {
            return;
        }
        
        await mongoose.connect(DB_URL);
        isConnected = true;
    } catch (er) {
        console.error(er);
        process.exit(1);
    }
}

export default connectDb;

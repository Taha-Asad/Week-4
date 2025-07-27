import mongoose from "mongoose";
import "colors"
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected successfully: ${conn.connection.host} `.bgGreen.white)
    } catch (error) {
        console.log(`Error connecting database: ${error.message}`.bgRed.yellow);
        process.exit(1);
    }
}

export default connectDB
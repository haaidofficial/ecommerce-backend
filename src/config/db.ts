import mongoose from 'mongoose';
import { appConfig } from '.';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(appConfig.dbURI as string);
        console.log(`Database connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Database connection failed`, err);
        process.exit(1);
    }
}

export default connectDB;
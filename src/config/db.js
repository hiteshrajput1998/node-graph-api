import mongoose from 'mongoose';

export default async (db) => {
        try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB');

        // const conn = await mongoose.connect(`mongodb://${process.env.MONGOOSE_DB_HOST}:${process.env.MONGOOSE_DB_PORT}/${process.env.MONGOOSE_DB_NAME}`);
        return conn;
    } catch (err) {
        throw new Error(`MongoDB connection error: ${err}`);
    }
};
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const connectDB = async () => {
    try {
        // Try connecting to local MongoDB first
        const localUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/foodiedelight';

        try {
            await mongoose.connect(localUri, { serverSelectionTimeoutMS: 2000 });
            console.log(`Connected to local MongoDB at ${localUri}`);
        } catch (err) {
            console.log('Local MongoDB not found, starting in-memory instance...');
            // Fallback to in-memory server
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log(`Connected to in-memory MongoDB at ${uri}`);
        }
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
};

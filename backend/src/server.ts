import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import restaurantRoutes from './routes/restaurantRoutes';
import { connectDB } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});
app.use('/api/restaurants', restaurantRoutes);

// Database Connection
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


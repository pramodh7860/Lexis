import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contractRoutes from './routes/contractRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { seedDatabase } from './seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/contracts', contractRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
  console.log('Connected to MongoDB');
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => console.log('Error connecting to MongoDB:', err.message));

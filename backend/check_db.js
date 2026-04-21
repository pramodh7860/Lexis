import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Contract from './models/Contract.js';

dotenv.config();

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const contracts = await Contract.find();
    console.log(`Found ${contracts.length} contracts`);
    contracts.forEach(c => {
      console.log(`- ${c.name} (ID: ${c._id}, Stage: ${c.stage})`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkDB();

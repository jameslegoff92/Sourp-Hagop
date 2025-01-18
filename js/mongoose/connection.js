import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });

import mongoose from 'mongoose';
import logger from '../logger/logger.js';

let isConnected = false; // Track the connection state. This stops us from creating unnecessary connections for different users. 

async function connectToDatabase() {
  if (isConnected) {
    console.log('🔄 Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    logger.info('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    throw error;
  }
}

// Close MongoDB connection gracefully
async function closeDatabaseConnection() {
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('🚪 MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error.message);
  }
}

// Attach handlers for application shutdown
function setupShutdownHooks() {
  process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received. Closing MongoDB connection...');
    await closeDatabaseConnection();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received. Closing MongoDB connection...');
    await closeDatabaseConnection();
    process.exit(0);
  });

  // For development purposes with hot reloading
  if (process.env.NODE_ENV === 'development') {
    process.once('SIGUSR2', async () => {
      console.log('🛠️ Restarting due to Nodemon...');
      await closeDatabaseConnection();
      process.kill(process.pid, 'SIGUSR2');
    });
  }
}

setupShutdownHooks(); //When you import a file 

export default connectToDatabase;
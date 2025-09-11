//dotenv is used to load the .env.local env variables from the nextjs environment into our nodejs environment
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";

// Global variable to track the connection state
let cached = global.mongoose; 

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // // Enable query logging for debugging
  mongoose.set("debug", true);

  // Use the existing connection if available
  if (cached.conn) {
    console.info("Using existing MongoDB connection");
    return cached.conn;
  }

  // Create a new connection if none exists
  if (!cached.promise) {
    console.info("Establishing new MongoDB connection...");
    cached.promise = mongoose.connect(process.env.MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.info("Successfully connected to MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    cached.promise = null; // Reset the promise if the connection fails
    throw error;
  }
}

// Close MongoDB connection gracefully
async function closeDatabaseConnection() {
  if (!cached.conn) {
    console.info("No MongoDB connection to close");
    return;
  }

  try {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.info("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error.message);
  }
}

// Attach handlers for application shutdown
function setupShutdownHooks() {
  process.on("SIGINT", async () => {
    console.info("SIGINT received. Closing MongoDB connection...");
    await closeDatabaseConnection();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.info("SIGTERM received. Closing MongoDB connection...");
    await closeDatabaseConnection();
    process.exit(0);
  });

  // For development purposes with hot reloading
  if (process.env.NODE_ENV === "development") {
    process.once("SIGUSR2", async () => {
      console.info("Restarting due to Nodemon...");
      await closeDatabaseConnection();
      process.kill(process.pid, "SIGUSR2");
    });
  }
}

setupShutdownHooks(); //When you import a file

export default connectToDatabase;

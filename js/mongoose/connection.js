import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import logger from "../logger/logger.js";

// Global variable to track the connection state
let cached = global.mongoose; 

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // Enable query logging for debugging
  mongoose.set("debug", true);

  // Use the existing connection if available
  if (cached.conn) {
    console.log("🔄 Using existing MongoDB connection");
    return cached.conn;
  }

  // Create a new connection if none exists
  if (!cached.promise) {
    console.log("⚡ Establishing new MongoDB connection...");
    cached.promise = mongoose.connect(process.env.MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Successfully connected to MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    cached.promise = null; // Reset the promise if the connection fails
    throw error;
  }
}

// Close MongoDB connection gracefully
async function closeDatabaseConnection() {
  if (!cached.conn) {
    console.log("🚪 No MongoDB connection to close");
    return;
  }

  try {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("🚪 MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error.message);
  }
}

// Attach handlers for application shutdown
function setupShutdownHooks() {
  process.on("SIGINT", async () => {
    console.log("🛑 SIGINT received. Closing MongoDB connection...");
    await closeDatabaseConnection();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    console.log("🛑 SIGTERM received. Closing MongoDB connection...");
    await closeDatabaseConnection();
    process.exit(0);
  });

  // For development purposes with hot reloading
  if (process.env.NODE_ENV === "development") {
    process.once("SIGUSR2", async () => {
      console.log("🛠️ Restarting due to Nodemon...");
      await closeDatabaseConnection();
      process.kill(process.pid, "SIGUSR2");
    });
  }
}

setupShutdownHooks(); //When you import a file

export default connectToDatabase;

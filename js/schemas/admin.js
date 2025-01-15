import mongoose from 'mongoose';

// Define the schema
const adminSchema = new mongoose.Schema({
  instagramAccessToken: { type: String, required: false },
});

// Create the model
const Admin = mongoose.model('Admin', adminSchema);

// Export the model
export default Admin;
import mongoose from "mongoose";
import logger from "../logger/logger.js";

// Define the schema
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, default: "admin" },
    instagramAccessToken: { type: String, required: false, default: "null" },
    instagramTokenExpirty: { type: Date, required: false },
    googleAccessToken: { type: String, required: false, default: "null" },
    googleTokenExpiry: { type: Date, required: false },
  },
  { collection: "admins" }
);

//Instance methods
adminSchema.methods.getInstagramAccessToken = function () {
  //this refers to the document instance
  logger.debug(
    `Getting Instagram access token for ${this.username}. Token: ${this.instagramAccessToken}`
  );
  return this.instagramAccessToken;
};


adminSchema.methods.updateInstagramAccessToken = function (newToken) {
  logger.debug(
    `Updating Instagram access token for ${this.username}. Token: ${newToken}`
  );
  this.instagramAccessToken = newToken;

  return this.save();
}

adminSchema

//Static methods
adminSchema.statics.findByUsername = async function () {
  const username = "admin";
  logger.debug(`Finding user by username: ${username}`);
  const user = await this.findOne({ username: username });
  return user;
};

//Post hooks
adminSchema.post("findOne", function (docs) {
  logger.debug(`Document retrieved from findOne query: ${docs}`);
});

// Create the model
const Admin = mongoose.model("Admin", adminSchema);

// Export the model
export default Admin;
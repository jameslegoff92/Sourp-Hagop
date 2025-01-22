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
adminSchema.methods.getInstagramAccessToken =  function () {
  //this refers to the document instance
  logger.debug(
    `Getting Instagram access token for ${this.username}. Token: ${this.instagramAccessToken}`
  );
  return this.instagramAccessToken;
};

adminSchema.methods.updateInstagramAccessToken = async function (newToken) {
  logger.debug(
    `Updating Instagram access token for ${this.username}. Token: ${newToken}`
  );
  this.instagramAccessToken = newToken;

  return this.save();
};

adminSchema.methods.getGoogleAccessToken = function () {
  //this refers to the document instance
  logger.debug(
    `Getting Google access token for ${this.username}. Token: ${this.googleAccessToken}`
  );
  return this.googleAccessToken;
};

adminSchema.methods.updateGoogleAccessToken = async function (newToken) {
  logger.debug(
    `Updating Google access token for ${this.username}. Token: ${newToken}`
  );
  this.googleAccessToken = newToken;

  return this.save();
};

adminSchema.methods.getGoogleTokenExpiry = function () {
  //this refers to the document instance
  logger.debug(
    `Getting Google token expiry for ${this.username}. Token: ${this.googleTokenExpiry}`
  );
  return this.googleTokenExpiry;
}

adminSchema.methods.updateGoogleTokenExpiry = async function (newExpiry) {
  logger.debug(
    `Updating Google token expiry for ${this.username}. Token: ${newExpiry}`
  );
  this.googleTokenExpiry = newExpiry;

  return this.save();
}

adminSchema.methods.getInstagramTokenExpiry = function () { 
  //this refers to the document instance
  logger.debug(
    `Getting Instagram token expiry for ${this.username}. Token: ${this.instagramTokenExpirty}`
  );
  return this.instagramTokenExpirty;
}

adminSchema.methods.updateInstagramTokenExpiry = async function (newExpiry) { 
  logger.debug(
    `Updating Instagram token expiry for ${this.username}. Token: ${newExpiry}`
  );
  this.instagramTokenExpirty = newExpiry;

  return this.save();
}

//Static methods
adminSchema.statics.findByUsername = async function () {
  const username = "admin";
  logger.debug(`Finding user by username: ${username}`);
  const user = this.findOne({ username: username });
  return user;
};

//Post hooks
adminSchema.post("findOne", function (docs) {
  logger.debug(`Document retrieved from findOne query: ${docs}`);
});

adminSchema.post("save", function (doc) { 
  logger.debug(`Document saved: ${doc}`);
});

// Create the model
const Admin = mongoose.model("Admin", adminSchema);

// Export the model
export default Admin;

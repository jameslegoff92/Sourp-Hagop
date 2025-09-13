import mongoose from "mongoose";

// Define the schema
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, default: "admin" },
    instagramAccessToken: { type: String, required: false, default: "null" },
    instagramTokenExpirty: { type: Number, required: false },
    googleAccessToken: { type: String, required: false, default: "null" },
    googleRefreshToken: {type: String, required: false, default: "null"},
    googleTokenExpiry: { type: Number, required: false, default: 0},
  },
  { collection: "admins" }
);

//Instance methods
adminSchema.methods.getInstagramAccessToken =  function () {
  //this refers to the document instance
  //console.debug(
    `Getting Instagram access token for ${this.username}. Token: ${this.instagramAccessToken}`
  //);
  return this.instagramAccessToken;
};

adminSchema.methods.updateInstagramAccessToken = async function (newToken) {
  //console.debug(
    `Updating Instagram access token for ${this.username}. Token: ${newToken}`
//  );
  this.instagramAccessToken = newToken;

  return this.save();
};

adminSchema.methods.getGoogleAccessToken = function () {
  //this refers to the document instance
  //console.debug(
    `Getting Google access token for ${this.username}. Token: ${this.googleAccessToken}`
//  );
  return this.googleAccessToken;
};

adminSchema.methods.updateGoogleAccessToken = async function (newToken) {
  //console.debug(
    `Updating Google access token for ${this.username}. Token: ${newToken}`
  //);
  this.googleAccessToken = newToken;

  return this.save();
};

adminSchema.methods.getGoogleRefreshToken = function () {
  //this refers to the document instance
  //console.debug(
    `Getting Google Refresh token for ${this.username}. Token: ${this.googleRefreshToken}`
  //);
  return this.googleRefreshToken;
};

adminSchema.methods.updateGoogleRefreshToken = async function (newToken) {
  //console.debug(
    `Updating Google Refresh token for ${this.username}. Token: ${newToken}`
//  );
  this.googleRefreshToken = newToken;

  return this.save();
};

adminSchema.methods.getGoogleTokenExpiry = function () {
  //this refers to the document instance
  //console.debug(
    `Getting Google token expiry for ${this.username}. Token: ${this.googleTokenExpiry}`
  //);
  return this.googleTokenExpiry;
}

adminSchema.methods.updateGoogleTokenExpiry = async function (newExpiry) {
  //console.debug(
    `Updating Google token expiry for ${this.username}. Token: ${newExpiry}`
//  );
  this.googleTokenExpiry = newExpiry;

  return this.save();
}

adminSchema.methods.getInstagramTokenExpiry = function () { 
  //this refers to the document instance
  //console.debug(
    `Getting Instagram token expiry for ${this.username}. Token: ${this.instagramTokenExpirty}`
//  );
  return this.instagramTokenExpirty;
}

adminSchema.methods.updateInstagramTokenExpiry = async function (newExpiry) { 
  //console.debug(
    `Updating Instagram token expiry for ${this.username}. Token: ${newExpiry}`
//  );
  this.instagramTokenExpirty = newExpiry;

  return this.save();
}

//Static methods
adminSchema.statics.getAdmin = async function () {
  const admin = "admin";
  //console.debug(`Finding user by username: ${admin}`);
  const superUser = this.findOne({ username: admin });
  return superUser;
};

//Post hooks
adminSchema.post("findOne", function (docs) {
  //console.debug(`Document retrieved from findOne query: ${docs}`);
});

adminSchema.post("save", function (doc) { 
  //console.debug(`Document saved: ${doc}`);
});

// Create the model
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

// Export the model
export default Admin;
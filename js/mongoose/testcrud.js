import Admin from  "../schemas/admin.js";
import logger from "../logger/logger.js";
import connectToDatabase from "./connection.js";

(async () => {
  try {
    await connectToDatabase();
    const admin = await Admin.findByUsername();
    const instagramAccessToken = admin.getInstagramAccessToken();
    const updateInstagramAccessToken = await admin.updateInstagramAccessToken("newToken");
    const googleAccessToken = admin.getGoogleAccessToken();
    const updateGoogleAccessToken = await admin.updateGoogleAccessToken("googleToken");
    const googleTokenExpiry = admin.getGoogleTokenExpiry();
    const updateGoogleTokenExpiry = await admin.updateGoogleTokenExpiry(new Date());
    const instagramTokenExpiry = admin.getInstagramTokenExpiry();
    const updateInstagramTokenExpiry = await admin.updateInstagramTokenExpiry(new Date());
  } catch (error) {
    logger.error( error , "Error occurred while finding admin ");
  }
})();
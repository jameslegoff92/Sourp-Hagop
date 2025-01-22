import Admin from  "../schemas/admin.js";
import logger from "../logger/logger.js";
import connectToDatabase from "./connection.js";

(async () => {
  try {
    await connectToDatabase();
    const admin = await Admin.findByUsername();
    const instagramAccessToken = admin.getInstagramAccessToken();
    const updateInstagramAccessToken = admin.updateInstagramAccessToken("newToken");
  } catch (error) {
    logger.error( error , "Error occurred while finding admin ");
  }
})();
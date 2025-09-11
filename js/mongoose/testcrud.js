import Admin from  "../schemas/admin.js";
import connectToDatabase from "./connection.js";

(async () => {
  try {
    await connectToDatabase();
    const admin = await Admin.getAdmin();
    const instagramAccessToken = admin.getInstagramAccessToken();
    const updateInstagramAccessToken = await admin.updateInstagramAccessToken("newToken");
    const googleAccessToken = admin.getGoogleAccessToken();
    const updateGoogleAccessToken = await admin.updateGoogleAccessToken("googleToken");
    const googleTokenExpiry = admin.getGoogleTokenExpiry();
    const updateGoogleTokenExpiry = await admin.updateGoogleTokenExpiry(5);
    const instagramTokenExpiry = admin.getInstagramTokenExpiry();
    const updateInstagramTokenExpiry = await admin.updateInstagramTokenExpiry(5);
  } catch (error) {
    console.error( error , "Error occurred while finding admin ");
  }
})();
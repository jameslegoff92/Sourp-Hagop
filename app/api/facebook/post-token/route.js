const axios = require("axios");
import connectToDatabase from "@/js/mongoose/connection";
import Admin from "@/js/schemas/admin.js";
import logger from "@/js/logger/logger.js";



export async function POST(request) {

    try {
      const body = await request.json(); // Extract accessToken from request body
      logger.debug("Request body received:", body); // Log the request body to ensure it's received
    } catch (error) {
      logger.error("Error parsing request body:", error.message); // Log an error if the request body cannot be parsed
      return new Response(
        JSON.stringify({ error: "Error parsing request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const shortLivedToken = body.accessToken; // Extract the access token from the request body
    const appId = process.env.FACEBOOK_APP_ID; // Get the Facebook App ID from the environment variables
    const appSecret = process.env.FACEBOOK_APP_SECRET; // Get the Facebook App Secret from the environment variables
    const projectID = process.env.PROJECT_ID; // Get the project ID from the environment variables
    const secretStoreId = process.env.SECRET_STORE_ID; // Get the secret store ID from the environment variables
    

    // Check if accessToken is provided
    if (!shortLivedToken) {
      logger.warn("No access token provided"); // Log a warning if the access token is not provided
      return new Response(
        JSON.stringify({ success: false, message: "No access token provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the access token to ensure it's received
    console.log("Access token received:", shortLivedToken);

    try {
      const response = await axios.get(
        "https://graph.facebook.com/v18.0/oauth/access_token",
        {
          params: {
            grant_type: "fb_exchange_token",
            client_id: appId,
            client_secret: appSecret,
            fb_exchange_token: shortLivedToken,
          },
        }
      );

      const { access_token } = response.data;
      console.log(
        "Long-lived token and expiration: ",
        access_token,
      );


    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to exchange token" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Respond with success if token is valid
    return new Response(
      JSON.stringify({
        success: true,
        message: "Token received successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
}

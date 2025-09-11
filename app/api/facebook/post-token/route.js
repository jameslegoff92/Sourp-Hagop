const axios = require("axios");
import connectToDatabase from "../../../../js/mongoose/connection.js";
import Admin from "../../../../js/schemas/admin.js";

export async function POST(request) {
  let body; // Initialize a variable to store the request body
  try {
    body = await request.json(); // Extract accessToken from request body
    console.debug(body, "Request body received"); // Log the request body to ensure it's received
  } catch (error) {
    console.error("Error parsing request body:", error.message); // Log an error if the request body cannot be parsed
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
    console.warn("No access token provided"); // Log a warning if the access token is not provided
    return new Response(
      JSON.stringify({ success: false, message: "No access token provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Log the access token to ensure it's received
  console.debug({ shortLivedToken }, "Access token received");

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

    console.debug(response.data, "Exchanged token received");
    const { access_token, expires_in } = response.data;
    console.debug({ access_token }, "Long-lived token and expiration received");

    // Connect to the database
    try {
      console.debug("Persisting token and expiry in database");
      await connectToDatabase();
      const admin = await Admin.findOne({ username: "admin" });
      await admin.updateInstagramAccessToken(access_token);
      await admin.updateInstagramTokenExpiry(expires_in);

    } catch (error) {
      console.error(error.message, "Failed to update token in database");
      return new Response(
        JSON.stringify({ error: "Failed to update token in database" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

  } catch (error) {
    console.error(error.message, "Failed to exchange token.");
    return new Response(JSON.stringify({ error: "Failed to exchange token" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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

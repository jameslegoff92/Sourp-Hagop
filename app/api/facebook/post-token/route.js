const axios = require("axios");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");


export async function POST(request) {
  if (request.method === "POST") {
    
    const client = new SecretManagerServiceClient();

    console.log("API received a POST request:", request.json); // Log the incoming request to check if fetch is working

    const body = await request.json(); // Extract accessToken from request body
    const shortLivedToken = body.accessToken; // Extract the access token from the request body
    const appId = process.env.FACEBOOK_APP_ID; // Get the Facebook App ID from the environment variables
    const appSecret = process.env.FACEBOOK_APP_SECRET; // Get the Facebook App Secret from the environment variables
    const projectID = process.env.PROJECT_ID; // Get the project ID from the environment variables
    const secretStoreId = process.env.SECRET_STORE_ID; // Get the secret store ID from the environment variables
    console.log("projectID", projectID);
    console.log("secretStoreID, ", secretStoreId);  

    // Check if accessToken is provided
    if (!shortLivedToken) {
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

      // Add detailed error handling here
      try {
        const [version] = await client.addSecretVersion({
          parent: `projects/${projectID}/secrets/${secretStoreId}`,
          payload: {
            data: Buffer.from(access_token, "utf8"),
          },
        });
        console.log(`Added secret version ${version.name}`);
      } catch (addSecretError) {
        console.error("Error adding secret version:", addSecretError);
      }
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
  } else {
    Response.setHeader("Allow", ["POST"]);
    Response.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

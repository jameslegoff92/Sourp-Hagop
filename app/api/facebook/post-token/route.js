export async function POST(request) {
  if (request.method === "POST") {
    console.log("API received a POST request:", request.json); // Log the incoming request to check if fetch is working

    const body = await request.json(); // Extract accessToken from request body
    const accessToken = body.accessToken; // Extract the access token from the request body
    const expiresIn = body.expiresIn; // Extract the token expiry from the request body

    // Check if accessToken is provided
    if (!accessToken) {
      return new Response(
        JSON.stringify({ success: false, message: "No access token provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the access token to ensure it's received
    console.log("Access token received:", accessToken);

    // Respond with success if token is valid
    return new Response(
      JSON.stringify({
        success: true,
        message: "Token received successfully",
        token: accessToken,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } else {
    Response.setHeader("Allow", ["POST"]);
    Response.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

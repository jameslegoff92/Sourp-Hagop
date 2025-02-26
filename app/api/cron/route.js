import { NextResponse } from "next/server";
import connectToDatabase from "@/js/mongoose/connection.js";
import Admin from "@/js/schemas/admin.js";
import { getNewAccessToken } from "@/js/google/googleapi.js";

export async function GET() {
  try {
    await connectToDatabase();
    const admin = await Admin.getAdmin();
    const refreshToken = await admin.getGoogleRefreshToken();
    const newAccessToken = await getNewAccessToken(refreshToken);
    admin.updateGoogleAccessToken(newAccessToken);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}

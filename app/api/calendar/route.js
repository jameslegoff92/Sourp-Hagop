// app/api/calendar/route.js
import { NextResponse } from "next/server";
import connectToDatabase from "@/js/mongoose/connection.js";
import Admin from "@/js/schemas/admin.js";
import { fetchGoogleCalendarData } from "@/libs/fetchData.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  if (!start || !end) return NextResponse.json({ items: [] }, { status: 400 });
  await connectToDatabase();
  const user = await Admin.getAdmin();
  const googleAccessToken = await user.getGoogleAccessToken();
  const items = await fetchGoogleCalendarData("primary", start, end, googleAccessToken);
  return NextResponse.json({ items: Array.isArray(items) ? items : [] });
}

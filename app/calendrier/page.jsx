import ReactCalendar from "@/components/display/ReactCalendar";
import { fetchGoogleCalendarData } from "@/libs/fetchData.js";
import connectToDatabase from "@/js/mongoose/connection.js";
import Admin from "@/js/schemas/admin.js";
import { DateTime } from "luxon";


export default async function Calendar() {
  await connectToDatabase();
  const user = await Admin.getAdmin();
  const googleAccessToken = await user.getGoogleAccessToken();
  const now = DateTime.local();

  // Get the current day at midnight in RFC3339 format
  const currentDayRFC3339 = now.startOf("day").toISO();

  // Get the last day of the month at midnight in RFC3339 format
  const lastDayRFC3339 = now.endOf("month").startOf("day").toISO();
  const calendarData = await fetchGoogleCalendarData("primary", currentDayRFC3339, lastDayRFC3339, googleAccessToken);

  return (
    <>
      <ReactCalendar data={calendarData} />
    </>
  );
}

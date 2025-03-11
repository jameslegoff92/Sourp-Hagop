import ReactCalendar from "@/components/display/ReactCalendar";
import { fetchGoogleCalendarData } from "@/libs/fetchData.js";
import connectToDatabase from "@/js/mongoose/connection.js";
import Admin from "@/js/schemas/admin.js";
import { getFirstNeighboringDay, getLastNeighboringDay } from "@/js/date.js";
import { DateTime } from "luxon";


/**
 * Server-side component to fetch calendar events from Google's API. 
 *
 * @export
 * @async
 * @returns {unknown} 
 */
export default async function Calendar() {
  //Check that the db connection is good.
  await connectToDatabase();
  const user = await Admin.getAdmin();
  const googleAccessToken = await user.getGoogleAccessToken();

  const today = DateTime.local();

  // Get the current day at midnight in RFC3339 format
  const startDate = getFirstNeighboringDay(today.year, today.month).toISO();

  // Get the last day of the month at midnight in RFC3339 format
  const endDate = getLastNeighboringDay(today.year, today.month).toISO();
  const calendarData = await fetchGoogleCalendarData("primary", startDate, endDate, googleAccessToken);

  return (
    <>
      <ReactCalendar data={calendarData} />
    </>
  );
}

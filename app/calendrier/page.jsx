export const dynamic = 'force-dynamic'
import ReactCalendar from "../../components/display/ReactCalendar";
import { fetchGoogleCalendarData } from "../../libs/fetchData.js";
import connectToDatabase from "../../js/mongoose/connection.js";
import Admin from "../../js/schemas/admin.js";
import { getFirstNeighboringDay, getLastNeighboringDay } from "../../js/date.js";
import { DateTime } from "luxon";
import { getCalendarPage } from "../../lib/sanity-queries";

/**
 * Server-side component to fetch calendar events from Google's API
 * and page content from Sanity CMS.
 *
 * @returns {JSX.Element} - Returns the React-Calendar component.
 */
export default async function Calendar() {
  // Connect to MongoDB and retrieve the admin user
  await connectToDatabase();
  const user = await Admin.getAdmin();
  
  // Retrieve Google OAuth tokens from the database
  const googleAccessToken = await user.getGoogleAccessToken();
  const googleRefreshToken = await user.getGoogleRefreshToken();
  
  // Compute the date range for the current month (including neighboring days)
  const today = DateTime.local();
  const startDate = getFirstNeighboringDay(today.year, today.month).toISO();
  const endDate = getLastNeighboringDay(today.year, today.month).toISO();
  
  // Callback to persist a refreshed access token back to the database
  const updateTokenCallback = async (newAccessToken) => {
    await user.updateGoogleAccessToken(newAccessToken);
  };
  
  // Fetch Google Calendar events and Sanity page data in parallel
  const [calendarData, pageData] = await Promise.all([
    fetchGoogleCalendarData(
      "primary",
      startDate,
      endDate,
      googleAccessToken,
      googleRefreshToken,
      updateTokenCallback
    ),
    getCalendarPage(),
  ]);

  return (
    <ReactCalendar data={calendarData} pageData={pageData} />
  );
}
//dotenv is used to load the .env.local env variables from the nextjs environment into our nodejs environment
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

/**
 * Function to fetch event data from Google's Calendar API
 *
 * @param {string} primary This parameter determines which calendar you are pulling events from.
 * @param {string} startDate Determines where you start collecting events. Needs to be in ISO8601 format.
 * @param {string} endDate Determines where you end collecting events. Needs to be in ISO8601 format.
 * @param {string} accessToken The OAuth Access Token you receive after authentication.
 * @returns {array}  
 */
export const fetchGoogleCalendarData = async (primary, startDate, endDate, accessToken) => {
  if (!primary || !startDate || !endDate || !accessToken) return [];

  const CALENDAR_ID = primary;
  const API_KEY = process.env.GOOGLE_API_KEY;
  if (!API_KEY) return [];

  const timeMin = startDate;
  const timeMax = endDate;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    console.info("Sending request to Google Calendar API.");
    const res = await fetch(url, { headers, cache: "no-store", next: { revalidate: 0 } });
    console.info("Response from Google Calendar API received.");
    if (!res.ok) {
      console.error({ status: res.status }, "Google Calendar API non-OK response");
      return [];
    }
    const data = await res.json();
    console.debug(data, "Parsed data from Google Calendar API.");
    const items = Array.isArray(data?.items) ? data.items : [];
    return items;
  } catch (error) {
    console.error(error, "Error from Google Calendar API events request: ");
    return [];
  }
};

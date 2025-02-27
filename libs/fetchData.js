//dotenv is used to load the .env.local env variables from the nextjs environment into our nodejs environment
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import logger from "../js/logger/logger.js";

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
  const CALENDAR_ID = primary;
  const API_KEY = process.env.GOOGLE_API_KEY;
  const timeMin = startDate;
  const timeMax = endDate;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    logger.info("Sending request to Google Calendar API.");
    const res = await fetch(url, { headers });
    logger.info("Response from Google Calendar API received.")
    const data = await res.json();
    logger.debug(data, "Parsed data from Google Calendar API.")
    return data.items;
  } catch (error) {
    logger.error(error, "Error from Google Calendar API events request: ");
  }
};

import dotenv from "dotenv";
import { getNewAccessToken } from "../js/google/googleapi.js"; // Import your existing function

dotenv.config({ path: ".env.local" });

export const fetchGoogleCalendarData = async (
  primary, 
  startDate, 
  endDate, 
  accessToken, 
  refreshToken, 
  updateTokenCallback
) => {
  if (!primary || !startDate || !endDate || !accessToken) return [];

  const CALENDAR_ID = primary;
  const API_KEY = process.env.GOOGLE_API_KEY;
  if (!API_KEY) return [];

  const timeMin = startDate;
  const timeMax = endDate;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}`;

  const makeRequest = async (token) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    //console.info("Sending request to Google Calendar API.");
    const res = await fetch(url, { headers, cache: "no-store", next: { revalidate: 0 } });
    //console.info("Response from Google Calendar API received.");
    
    return res;
  };

  try {
    // First attempt with current access token
    let res = await makeRequest(accessToken);

    // If unauthorized (token expired), try to refresh
    if (res.status === 401 && refreshToken) {
      //console.info("Access token expired, attempting to refresh...");
      
      const newAccessToken = await getNewAccessToken(refreshToken);
      
      if (newAccessToken) {
        //console.info("Successfully refreshed access token, updating database and retrying API request...");
        
        // Automatically update token in database
        if (updateTokenCallback) {
          await updateTokenCallback(newAccessToken);
        }
        
        // Retry the request with new token
        res = await makeRequest(newAccessToken);
      } else {
        //console.error("Failed to refresh access token");
        return [];
      }
    }

    if (!res.ok) {
      //console.error({ status: res.status }, "Google Calendar API non-OK response");
      return [];
    }

    const data = await res.json();
    //console.debug(data, "Parsed data from Google Calendar API.");
    const items = Array.isArray(data?.items) ? data.items : [];
    
    return items;

  } catch (error) {
    //console.error(error, "Error from Google Calendar API events request: ");
    return [];
  }
};
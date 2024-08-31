export const fetchGoogleCalendarData = (primary, startDate, endDate, authToken) => {
  const CALENDAR_ID = primary;
  const API_KEY = process.env.GOOGLE_API_KEY;
  const timeMin = startDate;
  const timeMax = endDate;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  return fetch(url, { headers })
    .then((res) => res.json())
    .then((data) => {
      return data.items;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

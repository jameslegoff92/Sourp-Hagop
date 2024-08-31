//Helper Functions
export function generateDateArrays() {
  const today = new Date();
  const dates = [[], [], []]; // Step 1: Initialize the array with 3 nested arrays

  // Define an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to add days to the date and store in the appropriate nested array
  function addDateToNestedArray(index, offset) {
    const adjustedDate = new Date(today);
    adjustedDate.setDate(today.getDate() + offset);

    const day = adjustedDate.getDate();
    const monthName = monthNames[adjustedDate.getMonth()];
    const year = adjustedDate.getFullYear();
    const title = ""

    dates[index].push({ day, month: monthName, year, title });
  }

  // Fill the first 5 days
  for (let i = 0; i < 5; i++) {
    addDateToNestedArray(0, i - 2);
  }

  // Fill the next 5 days
  for (let i = 0; i < 5; i++) {
    addDateToNestedArray(1, 3 + i);
  }

  // Fill the last 5 days
  for (let i = 0; i < 5; i++) {
    addDateToNestedArray(2, 7 + i);
  }

  return dates;
}

export function toISO8601(date) {
  const monthNames = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const year = String(date.year).padStart(4, "0");
  let month = date.month;

  // Check if the month is a string (name) and convert it to the index number
  if (typeof month === "string") {
    month = monthNames[month];
  }

  month = String(month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  const hours = String(date.hours || 0).padStart(2, "0");
  const minutes = String(date.minutes || 0).padStart(2, "0");
  const seconds = String(date.seconds || 0).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export function getDay(isoDateString) {
  // Regular expression to match basic ISO 8601 date string (YYYY-MM-DD)
  const iso8601BasicRegex = /^\d{4}-\d{2}-\d{2}$/;
  let dateString = isoDateString;
    // Check if the input matches the basic ISO 8601 format
    if (iso8601BasicRegex.test(dateString)) {
      // If it matches, append the time part to make it a full ISO string
       dateString = dateString + "T00:00:00";
    }

  const dateObject = new Date(dateString);

  // Extract the day of the month
  const day = dateObject.getDate().toString().padStart(2, "0");

  return day;
}

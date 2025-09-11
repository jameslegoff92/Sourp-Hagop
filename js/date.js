import { DateTime } from "luxon";
/**
 * Function to return the string value of the current month.
 * 
 * @returns {string} Returns the current month as a string. 
 */
export function getCurrentMonth() {
  const date = new Date();
  const month = date.getMonth();
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
  return monthNames[month];
}


/**
 * Return the previous month string
 *
 * @param {string} month The string value of a month
 * @returns {string} The string value for the previous month 
 */
export function getPrevMonth(month) {
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

  let monthIndex;
  for (let i = 0; i <= monthNames.length - 1; i++ ) {
    if (monthNames[i] === month) {
      monthIndex = i
    }
  }

  if (monthIndex === 0) {
    return monthNames[11]
  } else {
    return monthNames[monthIndex - 1]
  }
}


/**
 * Function to return the string value for the current day of the month
 * 
 * @returns {string} Returns the current day of the month as a string. 
 */
export function getCurrentDay() {
  const date = new Date();
  const day = String(date.getDay());
  return day;
}




/**
 * Function to create an array that holds the day and month determined by the arguments
 *
 * @param {string} day The current day 
 * @param {string} month The current month
 * @param {number} startDate The start date of the calendar. You can start it before the current day by using a negative integer. 
 * @param {number} endDate The end date of the calendar
 * @returns {object} Returns an array of objects
 */
export function createMiniCalendarArray(day, month, startDate, endDate) {

}

/**
 * Description placeholder
 *
 * @export
 * @returns {{}} 
 */
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

/**
 * Description placeholder
 *
 * @export
 * @param {*} date 
 * @returns {string} 
 */
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

/**
 * Description placeholder
 *
 * @export
 * @param {*} isoDateString 
 * @returns {*} 
 */
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


/**
 * Get the first neighboring day before the current month in a calendar grid.
 * @param {number} year - The year of the current month
 * @param {number} month - The month (1-12)
 * @returns {DateTime} The first neighboring day
 */
export function getFirstNeighboringDay(year, month) {
  const firstDayOfMonth = DateTime.local(year, month, 1);
  const daysBefore = firstDayOfMonth.weekday % 7; // 0 = Sunday, 1 = Monday, etc.

  return firstDayOfMonth.minus({ days: daysBefore });
}


/**
 * Get the last neighboring day after the current month in a calendar grid.
 * @param {number} year - The year of the current month
 * @param {number} month - The month (1-12)
 * @returns {DateTime} The last neighboring day
 */
export function getLastNeighboringDay(year, month) {
  const lastDayOfMonth = DateTime.local(year, month, 1).endOf("month");

  const daysBefore = DateTime.local(year, month, 1).weekday % 7;
  const totalDaysInGrid = 42; // 6 weeks × 7 days
  const daysAfter = totalDaysInGrid - (daysBefore + lastDayOfMonth.day);

  return lastDayOfMonth.plus({ days: daysAfter });
}
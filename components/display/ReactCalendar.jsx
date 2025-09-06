"use client";
import Calendar from "react-calendar";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";

export default function ReactCalendar({ data }) {
  const events = data;

  const tileContent = ({ date, view }) => {
    // We only want to show events in the month view
    if (view === "month") {
      // Convert the tile's date to a string in YYYY-MM-DD format
      const dateString = date.toISOString().split("T")[0];

      // Filter events that match the current tile's date. 
      const dayEvents = events.filter((event) => {
        //The google API uses date or dateTime for its event object. It is necessary to check both.
        if (event.start.date) {
          return event.start.date === dateString;
        }

        if (event.start.dateTime) {
          return event.start.dateTime.split("T")[0] === dateString;
        }
      });

      return (
        <div className="tile-events">
          {dayEvents.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {dayEvents.map((event) => (
                <li key={event.id} style={{ fontSize: "0.75em" }}>
                  <Link
                    href={{ pathname: `/calendrier/evenement/${event.id}` }}
                    query={{ summary: event.summary }}
                  >
                    {event.summary}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  };

  return (
    <div className="react-calendar-wrapper">
      <Calendar showNeighboringMonth={true} tileContent={tileContent} />
    </div>
  );
}

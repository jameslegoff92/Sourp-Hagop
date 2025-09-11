// components/ReactCalendar.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";

export default function ReactCalendar({ data }) {
  const [events, setEvents] = useState(Array.isArray(data) ? data : []);
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const ErrorBlock = () => (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          Something went wrong
        </h1>
        <p style={{ color: "#555", marginBottom: "1.25rem" }}>
          We couldn't load the calendar right now.
        </p>
        <div
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}
        >
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );

  const ymd = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const fetchMonth = useCallback(async (d) => {
    setLoading(true);
    setFailed(false);
    const start = new Date(
      Date.UTC(d.getFullYear(), d.getMonth(), 1, 0, 0, 0)
    ).toISOString();
    const end = new Date(
      Date.UTC(d.getFullYear(), d.getMonth() + 1, 1, 0, 0, 0)
    ).toISOString();
    try {
      const res = await fetch(
        `/api/calendar?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("bad");
      const json = await res.json();
      const items = Array.isArray(json?.items) ? json.items : [];
      setEvents(items);
    } catch {
      setFailed(true);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonth(activeStartDate);
  }, [activeStartDate, fetchMonth]);

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    if (failed) return <ErrorBlock />;
    const dateString = ymd(
      new Date(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const list = Array.isArray(events) ? events : [];
    const dayEvents = list.filter((event) => {
      const s = event?.start;
      if (!s) return false;
      if (s.date) return s.date === dateString;
      if (s.dateTime) return ymd(new Date(s.dateTime)) === dateString;
      return false;
    });
    return (
      <div className="tile-events">
        {dayEvents.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {dayEvents.map((event) => {
              // Extract and format times only if they exist
              let timeDisplay = "";
              if (event.start?.dateTime && event.end?.dateTime) {
                const startTime = new Date(
                  event.start.dateTime
                ).toLocaleTimeString("fr-CA", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });

                const endTime = new Date(event.end.dateTime).toLocaleTimeString(
                  "fr-CA",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                );

                timeDisplay = `${startTime} - ${endTime}`;
              }

              return (
                <li
                  key={event.id}
                  style={{ fontSize: "0.75em", marginBottom: "4px" }}
                >
                  <div>
                    <Link
                      href={{
                        pathname: `/calendrier/evenement/${event.id}`,
                        query: { 
                          eventData: encodeURIComponent(JSON.stringify(event))
                        }
                      }}
                    >
                      {event.summary}
                    </Link>
                  </div>
                  {timeDisplay && (
                    <div style={{ color: "#666", fontSize: "0.9em" }}>
                      {timeDisplay}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="react-calendar-wrapper">
      <Calendar
        showNeighboringMonth
        tileContent={tileContent}
        onActiveStartDateChange={({ activeStartDate }) =>
          activeStartDate && setActiveStartDate(activeStartDate)
        }
        onViewChange={({ activeStartDate }) =>
          activeStartDate && setActiveStartDate(activeStartDate)
        }
      />
    </div>
  );
}
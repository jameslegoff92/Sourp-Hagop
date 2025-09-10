"use client";
import Calendar from "react-calendar";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.css";

export default function ReactCalendar({ data }) {
  const events = data;

const ErrorBlock = () => (
  <main style={{minHeight:'60vh',display:'grid',placeItems:'center',padding:'2rem'}}>
    <div style={{maxWidth:560,width:'100%',textAlign:'center'}}>
      <h1 style={{fontSize:'1.75rem',fontWeight:700,marginBottom:'0.5rem'}}>Something went wrong</h1>
      <p style={{color:'#555',marginBottom:'1.25rem'}}>We couldn’t load the calendar right now.</p>
      <div style={{display:'flex',gap:'0.75rem',justifyContent:'center'}}>
        <button
          onClick={() => window.location.reload()}
          style={{padding:'0.6rem 1rem',borderRadius:8,border:'1px solid #ddd',background:'#fff',cursor:'pointer'}}
        >
          Try again
        </button>
        <button
          onClick={() => window.history.back()}
          style={{padding:'0.6rem 1rem',borderRadius:8,border:'1px solid #ddd',background:'#fff',cursor:'pointer'}}
        >
          Go back
        </button>
      </div>
    </div>
  </main>
);

const tileContent = ({ date, view }) => {
  if (view === "month") {
    if (!Array.isArray(events)) return <ErrorBlock />;

    const dateString = date.toISOString().split("T")[0];

    const dayEvents = events.filter((event) => {
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
  return null;
};


  return (
    <div className="react-calendar-wrapper">
      <Calendar showNeighboringMonth={true} tileContent={tileContent} />
    </div>
  );
}

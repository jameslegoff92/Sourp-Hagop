"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

/**
 * Event Details Page Component
 *
 * @returns {JSX.Element}
 */
export default function EventApp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  // Format date for display
  const formatEventDate = (event) => {
    if (!event?.start) return ""
    
    let startDate, endDate
    
    if (event.start.dateTime) {
      startDate = new Date(event.start.dateTime)
      endDate = event.end?.dateTime ? new Date(event.end.dateTime) : null
    } else if (event.start.date) {
      startDate = new Date(event.start.date + 'T00:00:00')
      endDate = event.end?.date ? new Date(event.end.date + 'T00:00:00') : null
    }
    
    if (!startDate) return ""
    
    const dateStr = startDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long'
    }).toUpperCase()
    
    if (event.start.dateTime && endDate) {
      const startTime = startDate.toLocaleTimeString('fr-CA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      const endTime = endDate.toLocaleTimeString('fr-CA', {
        hour: '2-digit',
        minute: '2-digit', 
        hour12: false
      })
      return `${dateStr} @ ${startTime} - ${endTime}`
    }
    
    return dateStr
  }
  
  // Format date for details section
  const formatDetailsDate = (event) => {
    if (!event?.start) return ""
    
    let date
    if (event.start.dateTime) {
      date = new Date(event.start.dateTime)
    } else if (event.start.date) {
      date = new Date(event.start.date + 'T00:00:00')
    }
    
    if (!date) return ""
    
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long'
    })
  }
  
  // Format time for details section
  const formatDetailsTime = (event) => {
    if (!event?.start?.dateTime || !event?.end?.dateTime) return ""
    
    const startTime = new Date(event.start.dateTime).toLocaleTimeString('fr-CA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    const endTime = new Date(event.end.dateTime).toLocaleTimeString('fr-CA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    return `${startTime} - ${endTime}`
  }
  
  // Check if event is in the past
  const isEventPast = (event) => {
    if (!event?.start) return false
    
    let eventDate
    if (event.start.dateTime) {
      eventDate = new Date(event.start.dateTime)
    } else if (event.start.date) {
      eventDate = new Date(event.start.date + 'T23:59:59')
    }
    
    return eventDate && eventDate < new Date()
  }
  
  // Get event category from summary or other fields
  const getEventCategory = (event) => {
    const summary = event?.summary?.toLowerCase() || ""
    
    if (summary.includes("secondaire")) return "Secondaire"
    if (summary.includes("primaire")) return "Primaire" 
    if (summary.includes("préscolaire") || summary.includes("maternelle")) return "Préscolaire"
    if (summary.includes("réunion") || summary.includes("rencontre")) return "Réunion"
    if (summary.includes("spectacle") || summary.includes("concert")) return "Spectacle"
    if (summary.includes("sortie") || summary.includes("voyage")) return "Sortie"
    
    return "Général"
  }

  useEffect(() => {
    try {
      setLoading(true)
      setError(false)
      
      // Get event data from URL parameters
      const eventDataParam = searchParams.get('eventData')
      
      if (!eventDataParam) {
        setError(true)
        return
      }
      
      // Parse the event data
      const event = JSON.parse(decodeURIComponent(eventDataParam))
      
      // Transform the Google Calendar event data for display
      const transformedData = {
        id: event.id,
        title: event.summary || "Événement sans titre",
        description: event.description || "",
        date: formatEventDate(event),
        details: {
          date: formatDetailsDate(event),
          time: formatDetailsTime(event),
          category: getEventCategory(event)
        },
        isPastEvent: isEventPast(event),
        rawEvent: event // Keep original event data if needed
      }
      
      setEventData(transformedData)
    } catch (err) {
      //console.error('Error parsing event data:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Chargement...
      </div>
    )
  }
  
  if (error || !eventData) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2 style={{ color: '#666', marginBottom: '20px' }}>
          Événement introuvable
        </h2>
        <button 
          onClick={() => router.back()}
          style={{
            padding: '10px 20px',
            border: '1px solid #ddd',
            background: '#fff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retour au calendrier
        </button>
      </div>
    )
  }

  return (
    <div className="event-page">
      {/* Header with back button */}
      <div className="event-header">
        <button 
          onClick={() => router.back()} 
          className="back-button"
        >
          « Tous les Évènements
        </button>
        
        {eventData.isPastEvent && (
          <p className="past-event-notice">
            Cet évènement est passé.
          </p>
        )}
      </div>

      {/* Event Title */}
      <h1 className="event-title">
        {eventData.title}
      </h1>

      {/* Event Date/Time */}
      <p className="event-datetime">
        {eventData.date}
      </p>


      {/* Event Details Section */}
      <div className="event-details">
        <h2 className="details-title">DÉTAILS</h2>
        
        <div className="details-content">
          <div className="detail-row">
            <span className="detail-label">Date :</span>
            <span className="detail-value">{eventData.details.date}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Heure :</span>
            <span className="detail-value">{eventData.details.time}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Catégorie d'Évènement:</span>
            <span className="detail-value category">{eventData.details.category}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .event-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .event-header {
          margin-bottom: 30px;
        }

        .back-button {
          background: none;
          border: none;
          color: #666;
          font-size: 16px;
          cursor: pointer;
          padding: 0;
          margin-bottom: 20px;
          text-decoration: none;
        }

        .back-button:hover {
          color: #333;
          text-decoration: underline;
        }

        .past-event-notice {
          color: #666;
          font-size: 16px;
          margin: 0;
        }

        .event-title {
          font-size: 48px;
          font-weight: 700;
          color: #333;
          line-height: 1.2;
          margin: 30px 0 20px 0;
        }

        .event-datetime {
          font-size: 18px;
          color: #666;
          font-weight: 500;
          margin-bottom: 50px;
          letter-spacing: 0.5px;
        }

        .event-details {
          background: #e9ecef;
          padding: 30px;
          border-radius: 4px;
        }

        .details-title {
          font-size: 14px;
          font-weight: 700;
          color: #333;
          letter-spacing: 1px;
          margin: 0 0 25px 0;
        }

        .details-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .detail-label {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .detail-value {
          font-size: 16px;
          color: #666;
        }

        .detail-value.category {
          color: #8b1538;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .event-page {
            padding: 20px 15px;
          }

          .event-title {
            font-size: 36px;
          }

          .event-datetime {
            font-size: 16px;
          }

          .event-details {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .event-title {
            font-size: 28px;
          }

          .add-to-calendar {
            padding: 10px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
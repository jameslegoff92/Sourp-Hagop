"use client"
import { useRouter } from "next/navigation"
/**
 * Server-side component for a Google Event
 *
 * @returns {JSX.Element}
 */
export default function EventApp() {
  const router = useRouter()
  return (
    <>
      <div>
        <button onClick={() => router.back()} >
          Retour au calendrier
        </button>
        <h1>H this is the calendar event page.</h1>
      </div>
    </>
  );
}

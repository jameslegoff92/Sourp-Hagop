"use client";

import dynamic from "next/dynamic";

const MiniCalendar = dynamic(() => import("./Calendar"), { ssr: false });

export default function CalendarWrapper() {
  return <MiniCalendar />;
}
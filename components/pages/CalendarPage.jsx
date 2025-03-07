'use client';
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ReactCalendar from "@/components/display/ReactCalendar";

export default function CalendarPage({ data }) {
  return (
    <>
      <Header
        animate={false}
        imageSrc="../images/header/team-header.svg"
        headerText="CALENDRIER"
        headerTextTop="60%"
      />
      <ReactCalendar data={data}  />
      <Footer />
    </>
  );
}
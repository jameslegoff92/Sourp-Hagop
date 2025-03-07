import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import ReactCalendar from "@/components/display/ReactCalendar";

export default function Calendar() {
  return (
    <>
       <Header animate = {false} imageSrc="../images/header/team-header.svg" headerText="NOTRE ÉQUIPE" headerTextTop="60%" />
      <ReactCalendar />
      <Footer />
    </>
  );
}

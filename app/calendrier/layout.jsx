import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function CalendarLayout({ children }) {
  return (
    <>
      <Header
        animate={false}
        imageSrc="/images/header/team-header.svg"
        headerText="Calendrier"
        headerTextTop="60%"
      />
      {children}
      <Footer />
    </>
  );
}

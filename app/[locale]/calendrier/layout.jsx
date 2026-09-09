import { setRequestLocale } from "next-intl/server";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default async function CalendarLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
{/*       <Header
        animate={false}
        imageSrc="/images/header/team-header.svg"
        headerText="Calendrier"
        headerTextTop="60%"
      /> */}
      {children}
      <Footer />
    </>
  );
}

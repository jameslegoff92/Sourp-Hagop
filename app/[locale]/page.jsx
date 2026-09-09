import { setRequestLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

// Above the fold — keep as regular imports (user sees these immediately)
import TopNav from "@/components/ui/topNav";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Nav from "@/components/ui/Nav";
import Container from "@/components/layout/Container";
import MainHeading from "@/components/display/MainHeading";
import AlertBanner from "@/components/ui/AlertBanner";
import CalendarWrapper from "@/components/display/CalendarWrapper";

// Below the fold — lazy load
const Intro = dynamic(() => import("@/components/display/Intro"));
const Values = dynamic(() => import("@/components/ui/Values"));
const Strengths = dynamic(() => import("@/components/ui/Strength"));
const Footer = dynamic(() => import("@/components/ui/Footer"));

import { getHomePage, getAlertBanner } from '@/lib/sanity-queries';

export default async function Homepage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const [data, alertData] = await Promise.all([
    getHomePage(locale),
    getAlertBanner(locale),
  ]);

  const videoUrl = data?.heroVideo?.asset?.url;

  return (
    <>
      <BackgroundVideo src={videoUrl}>
        <TopNav animate={true} />
        <AlertBanner data={alertData} />
        <Container>
          <Nav type="secondary" />
          <MainHeading />
        </Container>
      </BackgroundVideo>
      <Intro data={data?.introSection} />
      <Values
        sectionTitle={data?.valuesSection?.sectionTitle || t("defaultValuesTitle")}
        values={data?.valuesSection?.values || []}
      />
      <Strengths
        sectionTitle={data?.strengthsSection?.sectionTitle || t("defaultStrengthsTitle")}
        strengths={data?.strengthsSection?.strengths || []}
      />
      <CalendarWrapper />
    {/*   <InstagramData /> */}
      <Footer />
    </>
  );
}

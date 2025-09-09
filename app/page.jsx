//Local Components
import TopNav from "../components/ui/topNav";
import BackgroundVideo from "../components/ui/BackgroundVideo";
import Nav from "../components/ui/Nav";
import Container from "../components/layout/Container";
import MainHeading from "../components/display/MainHeading";
import Intro from "../components/display/Intro";
import Values from "../components/ui/Values";
import Strengths from "../components/ui/Strength";
import MiniCalendar from "../components/display/Calendar";
import InstagramData from "../components/display/InstagramData";
import Footer from "../components/ui/Footer";

import { getHomePage } from '../lib/sanity-queries';

export default async function Homepage() {
  const data = await getHomePage();

  return (
    <>
      <BackgroundVideo src="/videos/hero-video.mp4">
        <TopNav animate={true} />
        <Container>
          <Nav type="secondary" />
          <MainHeading />
        </Container>
      </BackgroundVideo>
      <Intro />
      <Values 
        sectionTitle={data?.valuesSection?.sectionTitle || "Nos Valeurs"} 
        values={data?.valuesSection?.values || []} 
      />
      <Strengths 
        sectionTitle={data?.strengthsSection?.sectionTitle || "Nos Forces"}
        strengths={data?.strengthsSection?.strengths || []}
      />
      <MiniCalendar />
    {/*   <InstagramData /> */}
      <Footer />
    </>
  );
}

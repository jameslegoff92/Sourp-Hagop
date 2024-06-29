//Local Components
import TopNav from "@/components/ui/topNav";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Nav from "@/components/ui/Nav";
import Container from "@/components/layout/Container";
import MainHeading from "@/components/display/MainHeading";

export default async function Homepage() {
  return (
    <>
      <BackgroundVideo src="videos/hero-video.mp4">
        <TopNav />
        <Container>
          <Nav />
          <MainHeading />
        </Container>
      </BackgroundVideo>
    </>
  );
}

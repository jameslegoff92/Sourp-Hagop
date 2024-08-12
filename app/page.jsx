//Local Components
import TopNav from "@/components/ui/topNav";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Nav from "@/components/ui/Nav";
import Container from "@/components/layout/Container";
import MainHeading from "@/components/display/MainHeading";
import Main from "@/components/layout/Main";

export default async function Homepage() {
  return (
    <>
      <BackgroundVideo src="videos/hero-video.mp4">
        <TopNav animate={true}/>
        <Container>
          <Nav type="secondary" />
          <MainHeading />
        </Container>
      </BackgroundVideo>
      <Main />
    </>
  );
}

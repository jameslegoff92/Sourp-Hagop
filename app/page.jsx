import TopNav from "@/components/ui/topNav";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Nav from "@/components/ui/Nav";
import Container from "@/components/layout/Container";

export default async function Homepage() {
  return (
    <>
      <BackgroundVideo src="videos/hero-video.mp4">
        <TopNav />
        <Container>
          <Nav />
        </Container>
      </BackgroundVideo>
    </>
  );
}

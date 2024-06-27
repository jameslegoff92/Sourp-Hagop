import TopNav from "@/components/ui/topNav";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import Nav from "@/components/ui/Nav";

export default async function Homepage() {
  return (
    <>
      <BackgroundVideo src="videos/hero-video.mp4">
        <TopNav />
        <Nav />
      </BackgroundVideo>
    </>
  );
}

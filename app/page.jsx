import TopNav from '@/components/ui/topNav';
import BackgroundVideo from '@/components/ui/backgroundVideo';

export default async function Homepage() {

  return (
    <>
      <TopNav />
      <BackgroundVideo src="videos/hero-video.mp4">
        <h1>Homepage</h1>
      </BackgroundVideo>
    </>
  );
}

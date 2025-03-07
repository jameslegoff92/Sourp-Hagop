import InstagramFeed from "./Instagram";
import { fetchInstagramMedia } from "@/js/axios/axios.js";
import  connectToDatabase  from "@/js/mongoose/connection.js";
import Admin from "@/js/schemas/admin";


export default async function InstagramData() {
  await connectToDatabase();
  const user = await Admin.getAdmin();
  const accessToken = await user.getInstagramAccessToken();
  const media = await fetchInstagramMedia(accessToken);
  const slicedMedia = media.slice(0, 3);

  return (
    <InstagramFeed data={slicedMedia}/>
  )
}
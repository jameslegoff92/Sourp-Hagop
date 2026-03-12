import Agora from "../../components/Agora"
import { getAgoraPage } from "../../lib/sanity-queries"

export default async function Page() {
  const data = await getAgoraPage()
  return <Agora data={data} />
}
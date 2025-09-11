import { getAiglePage } from "../../lib/sanity-queries"
import Aigle from "../../components/Aigle"

export default async function AiglePage() {
  const data = await getAiglePage()
  return <Aigle data={data} />
}

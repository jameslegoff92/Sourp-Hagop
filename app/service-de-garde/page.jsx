import ServiceDeGarde from "../../components/ServiceDeGarde"
import { getServiceDeGardePage } from "../../lib/sanity-queries"

export default async function Page() {
  const data = await getServiceDeGardePage()
  return <ServiceDeGarde data={data} />
}
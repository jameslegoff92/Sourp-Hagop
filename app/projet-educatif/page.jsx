import ProjetEducatif from "../../components/ProjetEducatif"
import { getProjetEducatifPage } from "../../lib/sanity-queries"

export default async function Page() {
  const data = await getProjetEducatifPage()
  return <ProjetEducatif data={data} />
}

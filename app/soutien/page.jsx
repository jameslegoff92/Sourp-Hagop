import Soutien from "../../components/Soutien"
import { getSoutienPage } from "../../lib/sanity-queries"

export default async function Page() {
  const data = await getSoutienPage()
  return <Soutien data={data} />
}
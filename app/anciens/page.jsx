import Anciens from "../../components/Anciens"
import { getAnciensPage } from "../../lib/sanity-queries"

export default async function Page() {
  const data = await getAnciensPage()
  return <Anciens data={data} />
}
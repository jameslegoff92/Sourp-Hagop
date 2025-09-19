import { getCrealabPage } from "../../lib/sanity-queries"
import Crealab from "../../components/Crealab"

export default async function CrealabPage() {
  const data = await getCrealabPage()
  return <Crealab data={data} />
}

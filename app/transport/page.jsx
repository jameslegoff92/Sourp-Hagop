// app/transport/page.js
import Transport from "../../components/Transport"
import { getTransportPage } from "../../lib/sanity-queries"

export default async function Page() {
  const data = await getTransportPage()
  return <Transport data={data} />
}
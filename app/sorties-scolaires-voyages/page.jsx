import { getTripsPage } from "../../lib/sanity-queries"
import Trips from "../../components/Trips"

export default async function TripsPage() {
  const data = await getTripsPage()
  return <Trips data={data} />
}

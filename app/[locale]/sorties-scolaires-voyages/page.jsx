import { setRequestLocale } from "next-intl/server";
import { getTripsPage } from "@/lib/sanity-queries"
import Trips from "@/components/Trips"

export default async function TripsPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getTripsPage(locale)
  return <Trips data={data} />
}

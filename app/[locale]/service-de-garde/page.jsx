import { setRequestLocale } from "next-intl/server";
import ServiceDeGarde from "@/components/ServiceDeGarde"
import { getServiceDeGardePage } from "@/lib/sanity-queries"

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getServiceDeGardePage(locale)
  return <ServiceDeGarde data={data} />
}
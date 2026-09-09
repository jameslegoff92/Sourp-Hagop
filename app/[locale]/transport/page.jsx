import { setRequestLocale } from "next-intl/server";
// app/transport/page.js
import Transport from "@/components/Transport"
import { getTransportPage } from "@/lib/sanity-queries"

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getTransportPage(locale)
  return <Transport data={data} />
}
import { setRequestLocale } from "next-intl/server";
import Soutien from "@/components/Soutien"
import { getSoutienPage } from "@/lib/sanity-queries"

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getSoutienPage()
  return <Soutien data={data} />
}
import { setRequestLocale } from "next-intl/server";
import Anciens from "@/components/Anciens"
import { getAnciensPage } from "@/lib/sanity-queries"

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getAnciensPage()
  return <Anciens data={data} />
}
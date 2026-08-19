import { setRequestLocale } from "next-intl/server";
import { getCrealabPage } from "@/lib/sanity-queries"
import Crealab from "@/components/Crealab"

export default async function CrealabPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getCrealabPage()
  return <Crealab data={data} />
}

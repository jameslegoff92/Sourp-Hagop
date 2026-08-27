import { setRequestLocale } from "next-intl/server";
import ProjetEducatif from "@/components/ProjetEducatif"
import { getProjetEducatifPage } from "@/lib/sanity-queries"

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getProjetEducatifPage(locale)
  return <ProjetEducatif data={data} />
}

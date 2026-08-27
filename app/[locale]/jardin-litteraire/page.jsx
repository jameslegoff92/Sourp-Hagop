import { setRequestLocale } from "next-intl/server";
import { getJardinLitterairePage } from "@/lib/sanity-queries"
import JardinLitteraire from "@/components/JardinLitteraire"

export default async function JardinLitterairePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getJardinLitterairePage(locale)
  return <JardinLitteraire data={data} />
}

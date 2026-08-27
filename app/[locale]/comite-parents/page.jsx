import { setRequestLocale } from "next-intl/server";
// app/comite-parents/page.js
import ComiteParents from "@/components/ComiteParents"
import { getComiteParentsPage } from "@/lib/sanity-queries"

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getComiteParentsPage(locale)
  
  console.log("Comite Parents Data:", JSON.stringify(data, null, 2))
  
  if (!data) {
    return <div>No data found - check console</div>
  }
  
  return <ComiteParents data={data} />
}
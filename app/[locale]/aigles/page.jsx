import { setRequestLocale } from "next-intl/server";
import { getAiglePage } from "@/lib/sanity-queries"
import Aigle from "@/components/Aigle"

export default async function AiglePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getAiglePage()
  return <Aigle data={data} />
}

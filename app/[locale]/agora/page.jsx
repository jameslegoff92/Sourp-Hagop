import { setRequestLocale } from "next-intl/server";
import Agora from "@/components/Agora"
import { getAgoraPage } from "@/lib/sanity-queries"

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getAgoraPage()
  return <Agora data={data} />
}
import { setRequestLocale } from "next-intl/server";
import { getPourquoiPage } from "@/lib/sanity-queries";
import PourquoiSourpHagop from "@/components/PourquoiSourpHagop";

export default async function PourquoiPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getPourquoiPage();
  return <PourquoiSourpHagop data={data} />;
}
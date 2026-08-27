import { setRequestLocale } from "next-intl/server";
import { getPrescolairePage } from "@/lib/sanity-queries";
import Prescolaire from "@/components/Prescolaire";

export default async function PrescolairePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getPrescolairePage(locale);
  return <Prescolaire data={data} />;
}
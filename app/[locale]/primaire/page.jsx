import { setRequestLocale } from "next-intl/server";
import { getPrimairePage } from "@/lib/sanity-queries";
import Primaire from '@/components/Primaire';

export default async function PrimairePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getPrimairePage(locale);
  return <Primaire data={data} />;
}
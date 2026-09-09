import { setRequestLocale } from "next-intl/server";
import { getSecondairePage } from "@/lib/sanity-queries";
import Secondaire from '@/components/Secondaire';

export default async function SecondairePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getSecondairePage(locale);
  return <Secondaire data={data} />;
}
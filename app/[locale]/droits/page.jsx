import { setRequestLocale } from "next-intl/server";
import { getTuitionFeesPage } from "@/lib/sanity-queries";
import TuitionFees from '@/components/TuitionFees';

export default async function TuitionFeesPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getTuitionFeesPage();
  return <TuitionFees data={data} />;
}
import { setRequestLocale } from "next-intl/server";
import { getAdmissionsPage } from "@/lib/sanity-queries";
import Admissions from '@/components/Admissions';

export default async function AdmissionsPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getAdmissionsPage(locale);
  return <Admissions data={data} />;
}
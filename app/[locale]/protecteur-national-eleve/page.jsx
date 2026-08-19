import { setRequestLocale } from "next-intl/server";
import ProtecteurNational from "@/components/ProtecteurNational";
import { getProtecteurNationalPage } from "@/lib/sanity-queries";

export default async function Page({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getProtecteurNationalPage();
  return <ProtecteurNational data={data} />;
}
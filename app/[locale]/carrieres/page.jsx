import { setRequestLocale } from "next-intl/server";
import Career from "@/components/Career";
import { getCareerPage } from "@/lib/sanity-queries";

export default async function CareerPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getCareerPage(locale);

  return <Career data={data} />;
}

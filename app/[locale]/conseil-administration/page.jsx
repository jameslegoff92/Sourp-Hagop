import { setRequestLocale } from "next-intl/server";
import { getAdministrationPage } from '@/lib/sanity-queries';
import Administration from '@/components/Administration';

export default async function AdministrationPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getAdministrationPage()
  return <Administration data={data} />
}

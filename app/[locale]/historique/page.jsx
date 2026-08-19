import { setRequestLocale } from "next-intl/server";
import { getHistoryPage } from '@/lib/sanity-queries';
import Historique from '@/components/Historique';

export default async function HistoriquePage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const historyData = await getHistoryPage();
  
  return <Historique historyData={historyData} />;
}
import { getHistoryPage } from '../../lib/sanity-queries';
import Historique from '../../components/Historique';

export default async function HistoriquePage() {
  const historyData = await getHistoryPage();
  
  return <Historique historyData={historyData} />;
}
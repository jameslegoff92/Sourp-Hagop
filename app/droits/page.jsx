import { getTuitionFeesPage } from "../../lib/sanity-queries";
import TuitionFees from '../../components/TuitionFees';

export default async function TuitionFeesPage() {
  const data = await getTuitionFeesPage();
  return <TuitionFees data={data} />;
}
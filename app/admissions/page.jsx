import { getAdmissionsPage } from "../../lib/sanity-queries";
import Admissions from '../../components/Admissions';

export default async function AdmissionsPage() {
  const data = await getAdmissionsPage();
  return <Admissions data={data} />;
}
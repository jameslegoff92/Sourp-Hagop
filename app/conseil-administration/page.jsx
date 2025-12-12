import { getAdministrationPage } from '../../lib/sanity-queries';
import Administration from '../../components/Administration';

export default async function AdministrationPage() {
  const data = await getAdministrationPage()
  return <Administration data={data} />
}

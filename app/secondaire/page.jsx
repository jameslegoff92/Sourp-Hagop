import { getSecondairePage } from "../../lib/sanity-queries";
import Secondaire from '../../components/Secondaire';

export default async function SecondairePage() {
  const data = await getSecondairePage();
  return <Secondaire data={data} />;
}
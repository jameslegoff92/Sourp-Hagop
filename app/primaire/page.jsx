import { getPrimairePage } from "../../lib/sanity-queries";
import Primaire from '../../components/Primaire';

export default async function PrimairePage() {
  const data = await getPrimairePage();
  return <Primaire data={data} />;
}
import { getPrescolairePage } from "../../lib/sanity-queries";
import Prescolaire from "../../components/Prescolaire";

export default async function PrescolairePage() {
  const data = await getPrescolairePage();
  return <Prescolaire data={data} />;
}
import { getPourquoiPage } from "../../lib/sanity-queries";
import PourquoiSourpHagop from "../../components/PourquoiSourpHagop";

export default async function PourquoiPage() {
  const data = await getPourquoiPage();
  return <PourquoiSourpHagop data={data} />;
}
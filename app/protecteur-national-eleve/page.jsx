import ProtecteurNational from "../../components/ProtecteurNational";
import { getProtecteurNationalPage } from "../../lib/sanity-queries";

export default async function Page() {
  const data = await getProtecteurNationalPage();
  return <ProtecteurNational data={data} />;
}
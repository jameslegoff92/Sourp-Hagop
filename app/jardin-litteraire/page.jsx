import { getJardinLitterairePage } from "../../lib/sanity-queries"
import JardinLitteraire from "../../components/JardinLitteraire"

export default async function JardinLitterairePage() {
  const data = await getJardinLitterairePage()
  return <JardinLitteraire data={data} />
}

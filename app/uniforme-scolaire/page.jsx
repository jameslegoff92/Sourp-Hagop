import { getUniformePage } from "../../lib/sanity-queries"
import Uniform from "../../components/Uniform"

export default async function UniformeScolaire() {
  const data = await getUniformePage()
  return <Uniform data={data} />
}

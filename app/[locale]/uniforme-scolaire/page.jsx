import { setRequestLocale } from "next-intl/server";
import { getUniformePage } from "@/lib/sanity-queries"
import Uniform from "@/components/Uniform"

export default async function UniformeScolaire({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getUniformePage(locale)
  return <Uniform data={data} />
}

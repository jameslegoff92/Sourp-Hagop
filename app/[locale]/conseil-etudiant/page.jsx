import { setRequestLocale } from "next-intl/server";
import { getStudentCouncilPage } from "@/lib/sanity-queries"
import StudentCouncil from "@/components/StudentCouncil"

export default async function StudentCouncilPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const data = await getStudentCouncilPage(locale)
  return <StudentCouncil data={data} />
}

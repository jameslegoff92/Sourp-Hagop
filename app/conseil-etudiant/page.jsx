import { getStudentCouncilPage } from "../../lib/sanity-queries"
import StudentCouncil from "../../components/StudentCouncil"

export default async function StudentCouncilPage() {
  const data = await getStudentCouncilPage()
  return <StudentCouncil data={data} />
}

import { getTeamPage } from '../../lib/sanity-queries';
import Team from '../../components/Team';

export default async function TeamPage() {
  const teamData = await getTeamPage();

  return <Team teamData={teamData} />;
}
import { setRequestLocale } from "next-intl/server";
import { getTeamPage } from '@/lib/sanity-queries';
import Team from '@/components/Team';

export default async function TeamPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const teamData = await getTeamPage();

  return <Team teamData={teamData} />;
}
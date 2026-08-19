import { setRequestLocale } from "next-intl/server";
import { getRentalSpacesPage } from '@/lib/sanity-queries';
import RentalSpaces from '@/components/RentalSpaces';

export default async function RentalSpacesPage({ params }) {
    const { locale } = await params;
    setRequestLocale(locale);
  const rentalSpacesData = await getRentalSpacesPage();
  
  return <RentalSpaces data={rentalSpacesData} />;
}
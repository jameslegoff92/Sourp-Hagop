import { getRentalSpacesPage } from '../../lib/sanity-queries';
import RentalSpaces from '../../components/RentalSpaces';

export default async function RentalSpacesPage() {
  const rentalSpacesData = await getRentalSpacesPage();
  
  return <RentalSpaces data={rentalSpacesData} />;
}
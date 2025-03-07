import CalendarPage from "@/components/pages/CalendarPage";
import { fetchGoogleCalendarData } from "@/libs/fetchData.js";
import connectToDatabase from "@/js/mongoose/connection.js";
import Admin from "@/js/schemas/admin.js";
import logger from "@/js/logger/logger.js";

export default async function Calendar() {
  await connectToDatabase();
  const user = await Admin.getAdmin();
  const googleAccessToken = await user.getGoogleAccessToken();
  

  return (
    <>
      <CalendarPage />
    </>
  );
}

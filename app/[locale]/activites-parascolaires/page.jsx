import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function ParascolaireRedirect({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect(
    "https://sites.google.com/ecolesourphagop.com/parascolaire/home?utm_source=brevo&utm_campaign=EASHebdo%205%20septembre%202025&utm_medium=email"
  );
}

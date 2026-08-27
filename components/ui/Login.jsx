import { getTranslations } from "next-intl/server";
import { signIn } from "@/auth";
import { Button } from "./Button";
import { FcGoogle } from "react-icons/fc";
import css from "./Login.module.css";


//Google OAuth Login Component
export default async function SignIn() {
  const t = await getTranslations("Login");
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <Button className={css.button} type="submit"> < FcGoogle/> {t("signInWithGoogle")} </Button>
      </form>

    </>
  );
}
import { setRequestLocale } from "next-intl/server";
import Login from "@/components/ui/Login";
import FacebookLogin from "@/components/ui/FacebookLogin";
import css from "./Page.module.css";

const SignIn = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className={css.container} >
        <Login />
        <FacebookLogin />
      </div>
    </>
  );
};

export default SignIn;

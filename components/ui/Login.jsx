import { signIn } from "../../auth";
import { Button } from "./Button";
import { FcGoogle } from "react-icons/fc";
import css from "./Login.module.css";


//Google OAuth Login Component
export default function SignIn() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <Button className={css.button} type="submit"> < FcGoogle/> Sign in with Google </Button>
      </form>

    </>
  );
}
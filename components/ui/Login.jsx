import { signIn } from "@/auth";

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
        <button type="submit">Signin with Google</button>
      </form>

    </>
  );
}
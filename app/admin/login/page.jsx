import Login from "@/components/ui/Login";
import FacebookLogin from "@/components/ui/FacebookLogin";
import css from "./Page.module.css";

const SignIn = () => {
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

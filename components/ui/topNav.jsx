import Link from "next/link";
import Image from "next/image";

import css from "./topNav.module.css";

const TopNav = () => {
  return (
    <nav className={css.navContainer}>
      <ul className={css.nav} >
        <li>
          <Link className={css.link} href="/">Careers</Link>
        </li>
        <li>
          <Link className={css.link} href="/about">Events</Link>
        </li>
        <li>
          <Link className={css.link} href="/contact">Alumni</Link>
        </li>
        <li>
          <Link className={css.link} href="/contact">Foundation</Link>
        </li>
      </ul>
      <Link className={`${css.link} ${css.portal}`} href="/portal">Portal</Link>
      <div className={css.langContainer} >
        <Image src="/images/chevron-down.svg" alt="chevron down" width={8} height={4} priority={true}/>
        <Image src="/images/lang.svg" alt="logo" width={21} height={23} priority={true} />
      </div>
    </nav>
  );
};

export default TopNav;

import NavDropdown from "./navDropdown";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavDropdown />
        </li>
        <li>
          <NavDropdown />
        </li>
        <li>
          <NavDropdown />
        </li>
        <li>
          <NavDropdown />
        </li>
        <li>
          <NavDropdown />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

import NavDropdown from "./NavDropdown";

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

import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

// Responsible for navigation links on main navbar
const NavLinks = () => {
  return (
    <Nav className="ms-auto">
      <Nav.Link as={NavLink} to={"/"} exact>
        Home
      </Nav.Link>
      <Nav.Link as={NavLink} to={"/products"} exact>
        Shop
      </Nav.Link>
      <Nav.Link as={NavLink}  to={"/about"}>
        About
      </Nav.Link>
      <Nav.Link as={NavLink} to={"/cart"}>
        Cart
      </Nav.Link>
    </Nav>
  );
};

export default NavLinks;

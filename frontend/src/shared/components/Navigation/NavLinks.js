import { NavLink } from "react-router-dom";
import { Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../features/user/userAuthSlice";

// Responsible for navigation links on main navbar
const NavLinks = () => {
  // Access userLogin state
  const { userInfo } = useSelector((state) => state.userAuth);

  // For dispatching actions
  const dispatch = useDispatch();

  // Handles logout
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Nav className="ms-auto">
      <Nav.Link as={NavLink} to={"/"} exact>
        Home
      </Nav.Link>
      <Nav.Link as={NavLink} to={"/products"} exact>
        Shop
      </Nav.Link>
      <Nav.Link as={NavLink} to={"/about"}>
        About
      </Nav.Link>
      <Nav.Link as={NavLink} to={"/cart"}>
        Cart
      </Nav.Link>
      {userInfo ? (
        <NavDropdown title={userInfo.name} id="username">
          <NavDropdown.Item as={Link} to="/users/profile">
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="">
            My Orders
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link as={NavLink} to={"/login"}>
          Log In
        </Nav.Link>
      )}
    </Nav>
  );
};

export default NavLinks;

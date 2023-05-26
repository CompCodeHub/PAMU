import React from "react";
import { Container, Navbar} from "react-bootstrap";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";

//Responsible for the navigation bar links
const MainNavigation = (props) => {
  return (
    <React.Fragment>
      <Navbar bg="mdark" variant="dark" expand="lg" className="navbar-static-top">
        <Container>
          <Navbar.Brand as={Link} to="/">PAMU</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLinks />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default MainNavigation;

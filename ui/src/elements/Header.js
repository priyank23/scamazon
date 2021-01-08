import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faUserCircle} from '@fortawesome/free-solid-svg-icons';
import './elements.css'
/*
  @author: Priyank Lohariwal
*/


class Header extends React.Component {

    render() {
      return (
        <Navbar className="header" variant="dark" expand="xl" sticky="top">
          <Navbar.Brand className="brandName" href="/">Scamazon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/"><FontAwesomeIcon icon={faHome}/></Nav.Link>
              <Nav.Link href="/profile"><FontAwesomeIcon icon={faUserCircle}/></Nav.Link>
              <Nav.Link href="/cart"><FontAwesomeIcon icon={faShoppingBag}/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}

export default Header;
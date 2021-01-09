import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faUserCircle, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import './elements.css'
import Cookies from 'universal-cookie';
/*
  @author: Priyank Lohariwal
*/

const cookie = new Cookies();
class Header extends React.Component {
    constructor(props) {
      super(props)
      this.signOut = this.signOut.bind(this)
    }

    signOut() {
      console.log('signing out')
    }
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
              {cookie.get('username') === '__dummy'?
                <Nav.Link href="/sign-in"><FontAwesomeIcon href="/sign-in" icon={faSignInAlt} /></Nav.Link>: 
                <Nav.Link><FontAwesomeIcon icon={faSignOutAlt} onClick={this.signOut} /></Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}

export default Header;
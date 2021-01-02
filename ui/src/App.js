import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar} from 'react-bootstrap';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

/*
  @author: Priyank Lohariwal
*/

class Header extends React.Component {
  render() {
    return( 
      <Navbar bg="dark" expand="xl" variant="dark">
        <Navbar.Brand href="/">Scamazon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/sign-up">Signup</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <h1>Home Page</h1>
    );
  }
}

class LoginPage extends React.Component {
  render() {
    return (
      <h1> LoginPage</h1>
    );
  }
}

class SignupPage extends React.Component {
  render() {
    return (
      <h1>Signup Page</h1>
    );
  }
}

class Cart extends React.Component {
  render() {
    return (
      <h1>Cart</h1>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <>
      <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/sign-up" component={SignupPage}/>
        <Route path="/cart" component={Cart}/>
      </Switch>
      </BrowserRouter>
      </>
    );
  }
}

export default App;

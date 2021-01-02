import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Card, Nav, Navbar} from 'react-bootstrap';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './test.jpg';
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

  constructor(props) {
    super(props);
    this.state = {
      products: null
    }
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    fetch("http://localhost:8080/scamazon/home")
      .then(res=> res.json())
      .then(res => {
        console.log(res);
      },
      (error) => {
        console.log('Error fetching products: ', error)
      })
  }

  render() {
    return (
      <>
        <ProductCard name="Shirt" currency="Rs. " price={500} />
        <ProductCard name="Shirt" currency="Rs. " price={500} />
      </>
    );
  }
}

class ProductCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>{this.props.name}</Card.Title>
        <Card.Text>
          {this.props.currency} {this.props.price}
        </Card.Text>
        <Button variant="success">Add to Cart</Button>
      </Card.Body>
    </Card>

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

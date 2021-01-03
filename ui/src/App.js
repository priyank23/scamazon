import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Badge, Button, Card, Nav, Navbar} from 'react-bootstrap';
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
      products: [],
      deals: []
    }
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    fetch("http://localhost:8080/scamazon/home")
      .then(res=> res.json())
      .then(res => {
        this.setState({products : res.products, deals: res.deals})
        console.log('[Home] Products fetched')
      },
      (error) => {
        console.log('[Home] Error fetching products: ', error)
      })
  }

  render() {
    return (
      <>
        <ul>
        {console.log(this.state.deals)}
        {this.state.deals.map((product, index) => 
           <ProductCard key={index} product={product} />
        )}
        </ul>
      </>
    );
  }
}

class ProductCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '15rem' }}>
        <Card.Img variant="top" src={logo} />
      <Card.Body>
        <Card.Title>
          <span className="left-wrapper">{this.props.product.name}</span>
          <span className="right-wrapper"><Button variant="outline-dark" size="sm">+</Button></span> 
        </Card.Title>
        <Card.Subtitle className="mb-1 text-muted">{this.props.product.type}{' '}{this.props.product.isDeal?<Badge variant="primary">{this.props.product.discount}{'% off'}</Badge>: null}</Card.Subtitle>
        <Card.Text>
          {'Rs.'}{(this.props.product.price*(1- this.props.product.discount*0.01)).toFixed(0)} <span className='ogPrice text-muted'>{this.props.product.price}</span>
        </Card.Text>
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

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Badge, Button, Card, Col, Container, Nav, Navbar, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from "universal-cookie";
/*
  @author: Priyank Lohariwal
*/
const cookies = new Cookies();
cookies.remove('myCat')

class Header extends React.Component {
  render() {
    return (
      <Navbar bg="dark" expand="xl" variant="dark" sticky="top">
        <Navbar.Brand href="/">Scamazon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
      .then(res => res.json())
      .then(res => {
        this.setState({ products: res.products, deals: res.deals })
        console.log('[Home] Products fetched')
      },
        (error) => {
          console.log('[Home] Error fetching products: ', error)
        })
  }

  render() {
    return (
      <>
        <Container className="product-carousel">
          <h1 className='home-header'>Top Picks</h1>
          <Row>
            {this.state.products.map((product, index) =>
              <Col className="product-wrapper" xs lg md xl sm><ProductCard key={index} product={product} /> </Col>
            )}
          </Row>
        </Container>
        <Container className="product-carousel">
          <h1 className='home-header'>Deals of the day</h1>
          <Row>
            {this.state.deals.map((product, index) =>
              <Col xs lg md xl sm><ProductCard key={index} product={product} /> </Col>
            )}
          </Row>
        </Container>
      </>
    );
  }
}

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.renderTooltip = this.renderTooltip.bind(this)
    this.addProduct = this.addProduct.bind(this)
  }

  addProduct() {
    let products = cookies.get('wishlist')
    console.log(products)
    if(!products) {
      products.set('wishlist', [{id:this.props.product.id, quan: 1}])
      return
    }
    let flag = false
    for (var i = 0; i < products.length; i++) {
      if (products[i].id === this.props.product.id) {
        products[i].quan += 1
        flag = true
        break
      }
    }

    if (!flag) {
      products.push({ id: this.props.product.id, quan: 1 })
    }

    cookies.set('wishlist', products, {path: '/'})

  }

  renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add to wishlist
    </Tooltip>
  );


  render() {
    return (
      <Card className="product-card">
        <Card.Img variant="top" src={this.props.product.imgSrc} />
        <Card.Body>
          <Card.Title>
            <span className="left-wrapper">{this.props.product.name}</span>
            <span className="right-wrapper">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip}
              >
                <Button onClick={this.addProduct} variant="outline-dark" size="sm">+</Button></OverlayTrigger></span>
          </Card.Title>
          <Card.Subtitle className="mb-1 text-muted">{this.props.product.type}{' '}{this.props.product.isDeal ? <Badge variant="primary">{this.props.product.discount}{'% off'}</Badge> : null}</Card.Subtitle>
          <Card.Text>
            {'Rs.'}{(this.props.product.price * (1 - this.props.product.discount * 0.01)).toFixed(0)} {this.props.product.isDeal ? <span className='ogPrice text-muted'>{this.props.product.price}</span> : null}
          </Card.Text>
        </Card.Body>
      </Card>

    );
  }
}

class LoginPage extends React.Component {
  render() {
    return (
      <h1>{cookies.get('myCat')}</h1>
    );
  }
}

class SignupPage extends React.Component {
  render() {
    return (
      <h1>{cookies.get('myCat')}</h1>
    );
  }
}

class Cart extends React.Component {
  render() {
    return (
      <pre>{console.log(cookies.getAll())}{JSON.stringify(cookies.get('wishlist'))}</pre>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/sign-up" component={SignupPage} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;

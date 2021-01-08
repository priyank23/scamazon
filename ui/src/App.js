import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Badge, Button, ButtonGroup, Card, Col, Container, Nav, Navbar, OverlayTrigger, Row, Tooltip} from 'react-bootstrap';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from "universal-cookie";
/*
  @author: Priyank Lohariwal
*/
const cookies = new Cookies();

class Header extends React.Component {
  render() {
    return (
      <Navbar className="header" variant="dark" expand="xl" sticky="top">
        <Navbar.Brand className="brandName" href="/">Scamazon</Navbar.Brand>
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
    fetch("http://localhost:8080/scamazon/home", {credentials: 'include'})
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
          <h1 className='column-header'>Top Picks</h1>
          <hr/>
          <Row>
            {this.state.products.map((product, index) =>
              <Col className="product-wrapper" xs lg md xl sm><ProductCard key={index} product={product} /> </Col>
            )}
          </Row>
        </Container>
        <hr/>
        <Container className="product-carousel">
          <h1 className='column-header'>Deals of the day</h1>
          <hr/>
          <Row>
            {this.state.deals.map((product, index) =>
              <Col className="product-wrapper" xs lg md xl sm><ProductCard key={index} product={product} /> </Col>
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
    fetch('http://localhost:8080/scamazon/updateWishlist', {
      method: 'POST',
      headers: {'content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({product: JSON.stringify(this.props.product), add: true}),
    })
    .then(response => response.json())
    .then((result) => { 
      console.log('[ProductCard] Product added to Bag')
    },
    (error) => {
      console.log('[ProductCard] Error adding product: ', error)
    })
  }

  renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add to wishlist
    </Tooltip>
  );


  render() {
    return (
      <Card className="product-card">
        <Card.Img src={this.props.product.imgSrc} />
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
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
    this.addProduct = this.addProduct.bind(this)
    this.removeProduct = this.removeProduct.bind(this)
  }

  componentDidMount() {
    this.fetchBag();
  }

  fetchBag() {
    fetch('http://localhost:8080/scamazon/bag', {credentials: 'include'})
    .then(response => response.json())
    .then((result) => { 
      console.log('[Bag] Bag fetched')
      this.setState({products: result})
    },
    (error) => {
      console.log('[Bag] Error fetching bag: ', error)
    })
  }

  addProduct(id) {
    var product;
    var index;
    for(var i=0;i<this.state.products.length; i++ ) {
      if(this.state.products[i].product.id === id ) {
        product  = this.state.products[i]
        index = i;
        break
      }
    }

    console.log(product)
    const options = {
      'method': 'POST',
      'headers': {'Content-Type': 'application/json'},
      'credentials': 'include',
      'body': JSON.stringify({'product': JSON.stringify(product.product), 'add': true})
    }

    fetch('http://localhost:8080/scamazon/updateWishlist', options)
      .then((response) => response.json())
      .then((result) => { 
        console.log('[CartProductCard] Product added to Bag' + result)
        let products = this.state.products;
        products[index].quantity += 1
        this.setState({products: products})
      },
      (error) => {
        console.log('[CartProductCard] Error adding product: ', error)
      })
  }

  removeProduct(id) {
    let product;
    let index;
    for(var i=0;i<this.state.products.length; i++ ) {
      if(this.state.products[i].product.id === id ) {
        product  = this.state.products[i]
        if(product.quantity === 0) return
        index = i;
        break
      }
    }

    fetch('http://localhost:8080/scamazon/updateWishlist', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({product: JSON.stringify(product.product), add: false})
    })
    .then(response => response.json())
    .then((result) => { 
      console.log('[ProductCard] Product removed from Bag')
      let products = this.state.products;
        products[index].quantity -= 1
        this.setState({products: products})
    },
    (error) => {
      console.log('[ProductCard] Error adding product: ', error)
    })
  }

  render() {
    return (
      <>
        <h1 className="column-header">Bag</h1>
        <hr />
        <Container>
          {this.state.products.map((product, index) => (
            <Row key= {index}>
              <Col xs lg md xl sm>
                <CartProductCard product={product.product} quantity={product.quantity} addProduct={this.addProduct} removeProduct={this.removeProduct} />
              </Col>
            </Row>
            ))
          }
          
        </Container>
      </>
    )
  }
  
}

class CartProductCard extends React.Component {

  constructor(props) {
    super(props)
    this.addProduct = this.addProduct.bind(this)
    this.removeProduct = this.removeProduct.bind(this)
  }

  addProduct() {
    this.props.addProduct(this.props.product.id)
  }

  removeProduct (){
    this.props.removeProduct(this.props.product.id)
  }

  render() {
    return (
      <Card className="cart-product-card">
        <Card.Img style={{width: "auto"}} src={this.props.product.imgSrc} />
        <Card.Body>
          <Card.Title>
            <span className="left-wrapper">{this.props.product.name}</span>
            <span className="right-wrapper">
              <ButtonGroup size="lg">
                <Button onClick={this.addProduct}>+</Button>
                <Button disabled>{this.props.quantity}</Button>
                <Button onClick={this.removeProduct}>-</Button>
              </ButtonGroup>
            </span>
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

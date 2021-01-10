import React from 'react';
import ProductCard from './ProductCard.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row} from 'react-bootstrap';
import './elements.css'

/*
  @author: Priyank Lohariwal
*/

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
          this.setState({ products: res.products, deals: res.deals , dealsFirst: res.dealsFirst})
          console.log('[Home] Products fetched')
        },
          (error) => {
            console.log('[Home] Error fetching products: ', error)
          })
    }
  
    render() {
      return (
        <>
          {this.state.dealsFirst?
          <>
          <Container className="product-carousel">
            <h1 className='column-header'>Deals of the day</h1>
            <hr/>
            <Row>
              {this.state.deals.map((product, index) =>
                <Col className="product-wrapper" key={index} xs lg md xl sm><ProductCard product={product} /> </Col>
              )}
            </Row>
          </Container>
          <hr/>
          <Container className="product-carousel">
            <h1 className='column-header'>Top Picks</h1>
            <hr/>
            <Row>
              {this.state.products.map((product, index) =>
                <Col className="product-wrapper" key={index} xs lg md xl sm><ProductCard product={product} /> </Col>
              )}
            </Row>
          </Container>
          <hr/>
          </>:
            <>
            <Container className="product-carousel">
              <h1 className='column-header'>Top picks</h1>
              <hr/>
              <Row>
                {this.state.products.map((product, index) =>
                  <Col className="product-wrapper" key={index} xs lg md xl sm><ProductCard product={product} /> </Col>
                )}
              </Row>
            </Container>
            <hr/>
            <Container className="product-carousel">
              <h1 className='column-header'>Deals of the day</h1>
              <hr/>
              <Row>
                {this.state.deals.map((product, index) =>
                  <Col className="product-wrapper" key={index} xs lg md xl sm><ProductCard product={product} /> </Col>
                )}
              </Row>
            </Container>
            <hr/>
            </>
          }
        </>
      );
    }
  }


export default Home;
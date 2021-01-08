import React from 'react';
import CartProductCard from './CartProductCard.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row} from 'react-bootstrap';
import './elements.css'
/*
  @author: Priyank Lohariwal
*/

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

export default Cart;
import React from 'react';
import CartProductCard from './CartProductCard.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './elements.css'
/*
  @author: Priyank Lohariwal
*/

class Cart extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        products: [],
        sum: 0
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
        var sum=0
        for(var i=0; i<result.length; i++) {
          sum += (result[i].quantity * (result[i].product.price * (1 - result[i].product.discount * 0.01)).toFixed(0) )
        }
        this.setState({sum})
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
          var sum=0
          for(var i=0; i<products.length; i++) {
            sum += (products[i].quantity * (products[i].product.price * (1 - products[i].product.discount * 0.01)).toFixed(0) )
          }
          this.setState({sum})
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
          var sum=0
          for(var i=0; i<products.length; i++) {
            sum += (products[i].quantity * (products[i].product.price * (1 - products[i].product.discount * 0.01)).toFixed(0) )
          }
          this.setState({sum})
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
          {this.state.products.length>0?
          <Container>
            <Row className="d-flex justify-content-end font-weight-bold" style={{fontFamily: "Times New Roman", color: "#555"}}><Col className="d-flex justify-content-end">Subtotal: {this.state.sum}</Col></Row>
            {this.state.products.map((product, index) => (
              <Row key= {index}>
                <Col xs lg md xl sm>
                  <CartProductCard product={product.product} quantity={product.quantity} addProduct={this.addProduct} removeProduct={this.removeProduct} />
                </Col>
              </Row>
              ))
            }
          </Container>:
          <div className="noProduct p-5">
          <span className="p-5 d-flex flex-column" style={{alignItems: "center"}}>
            <FontAwesomeIcon icon={faShoppingBag} style={{height: "150px", width: "150px", color: "#f3729d"}} />
            <label className="p-2">Wow! Such empty!</label>
            <Button className="noProductBtn" href="/">Lets shop!</Button>
          </span>
        </div>
        }
        </>
      )
    } 
}

export default Cart;
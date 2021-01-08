import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Badge, Button, ButtonGroup, Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign} from '@fortawesome/free-solid-svg-icons';
import './elements.css';
/*
  @author: Priyank Lohariwal
*/

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
            <FontAwesomeIcon className="rupeeSign" icon={faRupeeSign}/>{(this.props.product.price * (1 - this.props.product.discount * 0.01)).toFixed(0)} {this.props.product.isDeal ? <span className='ogPrice text-muted'>{this.props.product.price}</span> : null}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CartProductCard;
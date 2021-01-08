import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Badge, Button, Card, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faRupeeSign} from '@fortawesome/free-solid-svg-icons';
import './elements.css'
/*
  @author: Priyank Lohariwal
*/

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
      Add to Bag
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
                <Button onClick={this.addProduct} variant="outline-dark" size="sm"><FontAwesomeIcon icon={faCartPlus}/></Button></OverlayTrigger></span>
          </Card.Title>
          <Card.Subtitle className="mb-1 text-muted">{this.props.product.type}{' '}{this.props.product.isDeal ? <Badge variant="primary">{this.props.product.discount}{'% off'}</Badge> : null}</Card.Subtitle>
          <Card.Text>
            <FontAwesomeIcon icon={faRupeeSign}/>{(this.props.product.price * (1 - this.props.product.discount * 0.01)).toFixed(0)} {this.props.product.isDeal ? <span className='ogPrice text-muted'>{this.props.product.price}</span> : null}
          </Card.Text>
        </Card.Body>
      </Card>

    );
  }
}

export default ProductCard;
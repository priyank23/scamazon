import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './elements.css';
import Cookies from 'universal-cookie'
/*
  @author: Priyank Lohariwal
*/
const cookies = new Cookies();
class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    fetch('http://localhost:8080/scamazon/profile', { credentials: 'include' })
      .then(res => res.json())
      .then(result => {
        this.setState({ user: result })
        console.log('[Profile] User info fetched')
      },
        (error) => {
          console.log('[Profile] error fetching user: ' + error)
        })
  }

  render() {
    return (
      <>
      {typeof cookies.get('username') != 'undefined'?
        <Row className="py-5 px-4" style={{ maxWidth: "100%" }}>
          <Col className="md-5 mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-0 pb-4 cover">
                <div className="media align-items-end profile-head">
                  <div className="profile mr-3"><img src={(this.state.user && this.state.user.gender.toUpperCase() === "M")?"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80": "https://source.unsplash.com/1gVM_fHe8XY/130x130&fit=cover"} alt="..." width="130" class="rounded mb-2 img-thumbnail" /></div>
                  <div className="media-body mb-5 text-black">
                    <h3 className="mt-0 mb-0">{this.state.user ? this.state.user.name : null}</h3>
                    <p className="small mb-4"> <i class="fas fa-map-marker-alt mr-2"></i>@{this.state.user ? this.state.user.username : null}</p>
                  </div>
                </div>
              </div>
              <div className="bg-light p-4 d-flex justify-content-end text-center">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">{this.state.user ? this.state.user.scamazon_age : null}</h5><small className="text-muted">Scamazon Age</small>
                  </li>
                </ul>
              </div>
              <hr/>
              <h5 className="bg-light mt-2 d-flex justify-content-center text-center">About</h5><br/>
              <div className="bg-light mb-5 d-flex justify-content-center text-center">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0d-block">{this.state.user ? this.state.user.email : null}</h5><small className="text-muted"> Email</small>
                  </li>
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">{this.state.user ? this.state.user.gender.toUpperCase() : null}</h5><small className="text-muted">Gender</small>
                  </li>
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">{this.state.user ? this.state.user.age : null}</h5><small className="text-muted">Age</small>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>:
        <div className="noUser p-5">
          <span className="p-5 d-flex flex-column" style={{alignItems: "center"}}>
            <FontAwesomeIcon icon={faUserCircle} style={{height: "150px", width: "150px", color: "#d54d7b"}} />
            <label className="p-2">No one is signed in</label>
            <Button className="noUserBtn" href="/sign-in">Sign-in</Button>
          </span>
        </div>
        }
      </>
    );
  }
}

export default Profile;

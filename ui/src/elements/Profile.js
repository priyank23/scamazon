import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import './elements.css';
/*
  @author: Priyank Lohariwal
*/

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
        <Row className="py-5 px-4" style={{ maxWidth: "100%" }}>
          <Col className="md-5 mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-0 pb-4 cover">
                <div className="media align-items-end profile-head">
                  <div className="profile mr-3"><img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" alt="..." width="130" class="rounded mb-2 img-thumbnail" /><a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a></div>
                  <div className="media-body mb-5 text-white">
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
                    <h5 className="font-weight-bold mb-0 d-block">{this.state.user ? this.state.user.email : null}</h5><small className="text-muted"> Email</small>
                  </li>
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">{this.state.user ? this.state.user.gender : null}</h5><small className="text-muted">Gender</small>
                  </li>
                  <li className="list-inline-item">
                    <h5 className="font-weight-bold mb-0 d-block">{this.state.user ? this.state.user.age : null}</h5><small className="text-muted">Age</small>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default Profile;

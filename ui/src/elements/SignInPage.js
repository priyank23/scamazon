import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import './elements.css'

class SignInPage extends React.Component {
    constructor(props) {
        super(props)
        this.signIn = this.signIn.bind(this)
    }
    
    signIn() {

    }

    render() {
        return(
            <Row className="py-5">
                <Col className="py-5 d-flex justify-content-center">
                <div className="py-3 signInCard">
                <Form className="px-4 d-flex flex-column justify-content-center">
                    <h3 className="d-flex justify-content-center h-100">Sign In</h3>
                    <Form.Group className="d-flex input-group" controlId="formBasicEmail">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faUser}/>
                        <Form.Control className="d-inline ml-2" type="text" placeholder="Enter username" style={{borderRadius: "0"}}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faKey}/>
                        <Form.Control className="d-inline ml-2" type="password" placeholder="Password" style={{borderRadius: "0"}}/>
                    </Form.Group>
                    <Button className="mx-auto signInBtn" type="submit" >
                        Sign in
                    </Button>
                </Form>
                <div className="mt-4">
					<div className="d-flex justify-content-center links">
						Don't have an account? <a href="/sign-up" class="ml-2">Register here</a>
					</div>
					<div className="d-flex justify-content-center links">
						<a href="#">Forgot your password?</a>
					</div>
				</div>
            </div>
            </Col>
            </Row>
        );
    }
}

export default SignInPage;
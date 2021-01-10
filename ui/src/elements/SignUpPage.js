import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faUser, faKey, faEnvelope, faIdBadge} from '@fortawesome/free-solid-svg-icons';
import './elements.css'

class SignUpPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.signUp = this.signUp.bind(this)
        this.onChange = this.onChange.bind(this)   
    }
    
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    signUp(e) {
        e.preventDefault();
        console.log(this.state)
        fetch('http://localhost:8080/scamazon/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.headers)
        .then(result => {
            console.log(result.location)
            this.props.history.push(result.location)
        }, 
        (error) => {
            
        })

        e.target.reset();
        this.setState({});
    }

    render() {
        return(
            <Row className="py-0 my-0" style={{ maxWidth: "100%" }}>
                <Col className="pt-3 d-flex justify-content-center">
                <div className="py-3 signInCard">
                <Form className="px-4 d-flex flex-column justify-content-center" onSubmit={this.signUp}>
                    <h3 className="d-flex justify-content-center h-100">Sign Up</h3>
                    <Form.Group className="d-flex input-group" controlId="formBasicEmail">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faUser}/>
                        <Form.Control className="d-inline ml-2" name="username" type="text" placeholder="Enter username" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faEnvelope}/>
                        <Form.Control className="d-inline ml-2" name="email" type="text" placeholder="Enter Email address" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faIdBadge}/>
                        <Form.Control className="d-inline ml-2" name="name" type="text" placeholder="Enter Full Name" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword" style={{borderRadius: "0"}}>
                        <Form.Check className="d-inline pl-5" name="gender" label="Male" value="male" type='radio' style={{width: "50%", backgroundColor: "white", color: "black", borderRight: "#040027 1px solid"}} onChange={this.onChange}/>
                        <Form.Check className="d-inline pl-5" name="gender" label="Female" value="female" type='radio' style={{width: "50%", backgroundColor: "white", color: "black"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faBirthdayCake}/>
                        <Form.Control className="d-inline ml-2" name="dob" type="date" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faKey}/>
                        <Form.Control className="d-inline ml-2" name="password" type="password" placeholder="Password" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faKey}/>
                        <Form.Control className="d-inline ml-2" type="password" placeholder="Confirm Password" style={{borderRadius: "0"}}/>
                    </Form.Group>
                    <Button className="mx-auto signInBtn" type="submit">
                        Register
                    </Button>
                </Form>
                <div class="mt-4">
					<div class="d-flex justify-content-center links">
						Already have an account? <a href="/sign-in" className="ml-2">Sign-in</a>
					</div>
				</div>
            </div>
            </Col>
            </Row>
        );
    }
}

export default SignUpPage;
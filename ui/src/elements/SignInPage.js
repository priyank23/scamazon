import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import './elements.css'

class SignInPage extends React.Component {
    constructor(props) {
        super(props)
        this.state={creds: {}, verified: null}
        this.onChange = this.onChange.bind(this)
        this.signIn = this.signIn.bind(this)
    }
    
    onChange(e) {
        let creds = this.state.creds
        creds[e.target.name] = e.target.value
        this.setState({creds});
    }

    signIn(e) {
        e.preventDefault();
        console.log(this.state)
        fetch('http://localhost:8080/scamazon/signin', {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(this.state.creds),
        })
        .then(res => res.json())
        .then(result => {
            console.log(result.verified)
            this.setState({verified: result.verified})
            if(result.verified) this.props.history.push('/')
        }, 
        (error) => {
            console.log('Error signing in')
        })
        e.target.reset();
        this.setState({});
    }

    render() {
        return(
            <Row className="py-5">
                <Col className="py-5 d-flex justify-content-center">
                <div className="py-3 signInCard">
                <Form className="px-4 d-flex flex-column justify-content-center" onSubmit={this.signIn}>
                    <h3 className="d-flex justify-content-center h-100 signinHeader">Sign In</h3>
                    <Form.Group className="d-flex input-group" controlId="formBasicEmail">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faUser}/>
                        <Form.Control required className="d-inline ml-2" name="username" onChange={this.onChange} type="text" placeholder="Enter username" style={{borderRadius: "0"}}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faKey}/>
                        <Form.Control required className="d-inline ml-2" name="password" onChange={this.onChange} type="password" placeholder="Password" style={{borderRadius: "0"}}/>
                    </Form.Group>
                    <Button className="mx-auto signInBtn" type="submit" >
                        Sign in
                    </Button>
                </Form>
                <div className="mt-4">
                {this.state.verified === false? <label className="d-flex justify-content-center" style={{color: "#f00", width: "100%"}}> Error signin in! Please try again!</label>: null}
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
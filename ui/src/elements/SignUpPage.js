import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Col, Form, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faUser, faKey, faEnvelope, faIdBadge} from '@fortawesome/free-solid-svg-icons';
import './elements.css'

class SignUpPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {info: {}, errors: {}, disabled: true}
        this.signUp = this.signUp.bind(this)
        this.onChange = this.onChange.bind(this)   
    }
    
    onChange(e) {
        let info = this.state.info
        let errors = this.state.errors
        if(e.target.name === 'email') {
            if(e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                info[e.target.name]= e.target.value
                errors['email'] = 'valid'
                
                this.setState({info, errors});
            } else {
                errors['email'] = "invalid"
                this.setState({errors})
            }
        }
        else if(e.target.name === 'password') {
            if(e.target.value.length >=8){
                info[e.target.name]= e.target.value
                errors['password'] = 'valid'
                this.setState({info, errors});
            } else {
                errors['password'] = "invalid"
                this.setState({errors})
            }
        }
        else if(e.target.name === 'cpassword') {
            if(e.target.value !== this.state.info.password) {
                errors['cpassword'] = 'invalid'
                this.setState({errors})
            } else {
                errors['cpassword'] = 'valid'
                this.setState({errors})
            }
        }
        else {
            info[e.target.name]= e.target.value
            this.setState({info});
        }
        
        let disabled = false
        if(Object.keys(this.state.info).length < 6) disabled = true
        for( var key in errors) {
            if(errors.hasOwnProperty(key)) {
                if(errors[key] === 'invalid') disabled=true
            }
        }
        this.setState({disabled})

    }

    signUp(e) {
        e.preventDefault();
        console.log(this.state)
        fetch('http://localhost:8080/scamazon/signup', {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(this.state.info),
        })
        .then(res => res.json())
        .then(result => {
            let errors = this.state.errors
            console.log(result.added)
            if(result.added) {
                this.props.history.push('/sign-in')
                errors['signedUp'] = true
            }
            else errors['signedUp'] = false
            this.setState({errors})
        }, 
        (error) => {
            console.log(('Error signing up'));
        })

        e.target.reset();
        this.setState({info: null, errors: {}});
    }

    render() {
        return(
            <Row className="py-0 my-0" style={{ maxWidth: "100%" }}>
                <Col className="pt-3 d-flex justify-content-center">
                <div className="py-3 signInCard">
                <Form className="px-4 d-flex flex-column justify-content-center" onSubmit={this.signUp}>
                    <h3 className="d-flex justify-content-center h-100 signinHeader">Sign Up</h3>
                    <Form.Group className="d-flex input-group" controlId="formBasicEmail">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faUser}/>
                        <Form.Control required className="d-inline ml-2" name="username" type="text" placeholder="Enter username" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    {this.state.errors.email === 'invalid'? <Form.Text style={{color: "#f00", width: "100%"}}>Invalid email address</Form.Text>: null}
                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faEnvelope}/>
                        <Form.Control required className="d-inline ml-2" name="email" type="text" placeholder="Enter Email address" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faIdBadge}/>
                        <Form.Control required className="d-inline ml-2" name="name" type="text" placeholder="Enter Full Name" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword" style={{borderRadius: "0"}}>
                        <Form.Check className="d-inline pl-5" name="gender" label="Male" value="male" type='radio' style={{width: "50%", backgroundColor: "white", color: "black", borderRight: "#040027 1px solid"}} onChange={this.onChange}/>
                        <Form.Check required className="d-inline pl-5" name="gender" label="Female" value="female" type='radio' style={{width: "50%", backgroundColor: "white", color: "black"}} onChange={this.onChange}/>
                    </Form.Group>

                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faBirthdayCake}/>
                        <Form.Control required className="d-inline ml-2" name="dob" type="date" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>
                    
                    {this.state.errors.password === 'invalid'? <Form.Text style={{color: "#f00", width: "100%"}}>Password must be of length >=8</Form.Text>: null}
                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faKey}/>
                        <Form.Control required className="d-inline ml-2" name="password" type="password" placeholder="Password" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>

                    {this.state.errors.cpassword === 'invalid'? <Form.Text style={{color: "#f00", width: "100%"}}>Passwords do not match</Form.Text>: null}
                    <Form.Group className="d-flex input-group" controlId="formBasicPassword">
                        <FontAwesomeIcon size="lg" className="d-inline ml-2 mt-2" icon={faKey}/>
                        <Form.Control required className="d-inline ml-2" name="cpassword" type="password" placeholder="Confirm Password" style={{borderRadius: "0"}} onChange={this.onChange}/>
                    </Form.Group>
                    <Button disabled={this.state.disabled}  className="mx-auto signInBtn" type="submit">
                        Register
                    </Button>
                </Form>
                
                <div class="mt-4 d-flex flex-column">
                {this.state.errors.signedUp === false? <label className="d-flex justify-content-center" style={{color: "#f00", width: "100%"}}> Error signing up! Please Try again!</label>: null}
					<div class="mt-0 d-flex justify-content-center links">
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
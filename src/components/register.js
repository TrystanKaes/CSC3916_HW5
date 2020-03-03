import React, { Component} from 'react';
import { submitRegister } from '../actions/authActions';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class Register extends Component {

    constructor(){
        super();

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.state = {
            details:{
                name: '',
                username: '',
                password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    register(){
        const {dispatch} = this.props;
        dispatch(submitRegister(this.state.details));
    }

    render(){
        return (
            <Form horizontal>
                <FormGroup controlId="name">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.name} type="text" placeholder="Name" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="username">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.username} type="text" placeholder="Username" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col componentClass={ControlLabel} sm={2}>
                        Password
                    </Col>
                    <Col sm={9}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.password} type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={9}>
                        <Button onClick={this.register}>Register</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Register);
import React, { Component } from 'react';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { loginOwnerMutation } from '../../mutation/mutation';

class OwnerLogin extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            authFlag: false
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        this.props.loginOwnerMutation({
            variables: {
                email: this.state.email,
                password: this.state.password
            },
        }).then(response => {
            this.setState({
                authFlag: true
            });
        });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/ownerAccount" />
        }
        return (
            <div>
                {redirectVar}
                <br />
                <br />
                <br />
                <div className="container">

                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Grubhub for Restaurants</h2>
                            </div>
                            <br />
                            <form onSubmit={this.submitLogin}>
                                <div className="form-group">
                                    <input onChange={this.emailChangeHandler} type="email" className="form-control" name="email" placeholder="Email" required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required />
                                </div>
                                <button className="btn btn-primary">Login</button>

                                <br></br><br />
                                <Link to='/ownerSignup'>Signup</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(loginOwnerMutation, { name: "loginOwnerMutation" })
)(OwnerLogin);
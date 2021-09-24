import React from "react";

import './sign-in.styles.scss'

class Signin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();//prevents the default submit action from firing

        this.setState({ email: '', password: '' }); // set emai + pswd back to empty striings
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value }); // rerender w/ updated value as  it chaanges
    }

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <input 
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        onChange={this.handleChange}
                        required
                    />
                    <label>Email</label>
                    <input 
                        name="password" 
                        type="password" 
                        value={this.state.password} 
                        onChange={this.handleChange}
                        required
                    />
                    <label>Password</label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Signin;
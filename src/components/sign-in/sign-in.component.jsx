import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

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

        this.setState({ [name]: value }); // rerender w/ updated value as  it changes
    }

    render() {
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        label="email"
                        required
                    />
                    <FormInput 
                        name="password" 
                        type="password" 
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        label="password"
                        required
                    />

                    <CustomButton type="submit" value="Submit"> Sign In </CustomButton>
                </form>
            </div>
        )
    }
}

export default Signin;
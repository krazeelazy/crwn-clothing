import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import './sign-in.styles.scss'

class Signin extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();//prevents the default submit action from firing

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' }); // set email + pswd back to empty strings
        } catch (error) {
            console.log(error);
        }
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
                    <div className='buttons'>
                        <CustomButton type="submit" value="Submit"> Sign In </CustomButton>
                        <CustomButton type='button' onClick={ signInWithGoogle } isGoogleSignin>
                            Sign In with Google 
                        </CustomButton> 
                        {// when click button a pop up to choose google account is shown
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default Signin;
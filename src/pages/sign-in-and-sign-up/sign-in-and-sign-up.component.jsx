import React from 'react';

import Signin from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = () => (
    <SignInAndSignUpContainer>
        <Signin />
        <SignUp />
    </SignInAndSignUpContainer>
);

export default SignInAndSignUpPage;
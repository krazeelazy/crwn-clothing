import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'


const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() =>
    import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = () => {
    const currentUser = useSelector(selectCurrentUser); // replaces mapStateToProps
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);
    
    return (
        <div>
            <GlobalStyle />
            <Header/>
            <Switch>
                <Suspense fallback={<Spinner />} >
                    <Route exact path='/' component={HomePage} /> 
                    <Route path='/shop' component={ShopPage} /> 
                    <Route exact path='/checkout' component={CheckoutPage} /> 
                    <Route 
                        exact 
                        path='/signin' 
                        render={() => 
                            currentUser ? ( // if the user is signed in
                                <Redirect to='/' /> // redir to the home page
                            ) : (
                                <SignInAndSignUpPage /> // else render the signinandsignup page
                                )
                        } 
                    /> 
                </Suspense>
            </Switch>
        </div>
        );
    }

export default App;

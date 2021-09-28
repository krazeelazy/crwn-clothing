import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
    
    unsubscribeFromAuth = null;
    
    componentDidMount() {

        // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        //     if (userAuth) {
        //         const userRef = await createUserProfileDocument(userAuth);
                
        //         userRef.onSnapshot(snapShot => { // onSnapshot is similar to onStateChange, we're subscribing to the user ref and listening for any changes
        //             setCurrentUser({
        //                 id: snapShot.id,
        //                 ...snapShot.data() // need .data() to actually get the data from the snapshot object
        //             });                  
        //         });
        //     } else {// if userAuth is null (user signed out)
        //         setCurrentUser(userAuth);
        //     }
            
        // });
    }
    
    componentWillUnmount() {
        this.unsubscribeFromAuth(); // closes subscription
    }
    
    render() {
        return (
            <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage} /> 
                <Route path='/shop' component={ShopPage} /> 
                <Route exact path='/checkout' component={CheckoutPage} /> 
                <Route 
                    exact 
                    path='/signin' 
                    render={() => 
                        this.props.currentUser ? ( // if the user is signed in
                            <Redirect to='/' /> // redir to the home page
                        ) : (
                            <SignInAndSignUpPage /> // else render the signinandsignup page
                        )
                    } 
                /> 
            </Switch>
            </div>
            );
        }
    }
    
const mapStateToProps = createStructuredSelector({ 
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);

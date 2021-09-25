import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
    
    unsubscribeFromAuth = null;
    
    componentDidMount() {
        const { setCurrentUser } = this.props; // get the setCurrentUser reducer action from the props (added to props in mapDispatchToProps)

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                
                userRef.onSnapshot(snapShot => { // onSnapshot is similar to onStateChange, we're subscribing to the user ref and listening for any changes
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data() // need .data() to actually get the data from the snapshot object
                    });                  
                });
            } else {// if userAuth is null (user signed out)
                setCurrentUser(userAuth);
            }
            
        });
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
            <Route path='/signin' component={SignInAndSignUpPage} /> 
            </Switch>
            </div>
            );
        }
    }
    
    const mapDispatchToProps = dispatch => ({
        setCurrentUser: user => dispatch(setCurrentUser(user))
    })

export default connect(null, mapDispatchToProps)(App); // 1st argument null because we don't need any state

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
    constructor() {
        super();
        
        this.state = {
            currentUser: null
        };
    }
    
    unsubscribeFromAuth = null;
    
    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                
                userRef.onSnapshot(snapShot => { // onSnapshot is similar to onStateChange, we're subscribing to the user ref and listening for any changes
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data() // need .data() to actually get the data from the snapshot object
                        }
                    });                  
                });
            } else {// if userAuth is null (user signed out)
                this.setState({ currentUser: userAuth });
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
    
export default App;

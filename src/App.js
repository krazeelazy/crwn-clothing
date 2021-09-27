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

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
    
    unsubscribeFromAuth = null;
    
    componentDidMount() {
        const { setCurrentUser, collectionsArray } = this.props; // get the setCurrentUser reducer action from the props (added to props in mapDispatchToProps)

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

                addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items }))); // we don't need all the data from the file, just the title and items for each collection
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

    collectionsArray: selectCollectionsForPreview // get the shop data from the file
});

    const mapDispatchToProps = dispatch => ({
        setCurrentUser: user => dispatch(setCurrentUser(user))
    })

export default connect(mapStateToProps, mapDispatchToProps)(App);

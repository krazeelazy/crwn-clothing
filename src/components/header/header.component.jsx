import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { ReactComponent as Logo } from '../../assets/crown.svg'

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">
                SHOP
            </Link>
            <Link className='option' to="/contact">
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>
                    Sign Out
                </div>
                :
                <Link className='option' to="/signin">
                    SIGN IN
                </Link>
            }
            <CartIcon /> 
        </div>
        {
            hidden ? // if hidden is true
            null : // don't render anything
            <CartDropdown /> // else render the CartDropdown component
        }
    </div>
);

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({ // destructuring nested values (getting state.user.currentUser and state.cart.hidden)
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);
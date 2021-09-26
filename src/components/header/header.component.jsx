import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils'
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { 
    HeaderContainer, 
    LogoContainer, 
    OptionsContainer, 
    OptionDiv, 
    OptionLink 
} from './header.styles'

const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">
                SHOP
            </OptionLink>
            <OptionLink to="/contact">
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionDiv onClick={() => auth.signOut()}>
                    Sign Out
                </OptionDiv>
                :
                <OptionLink to="/signin">
                    SIGN IN
                </OptionLink>
            }
            <CartIcon /> 
        </OptionsContainer>
        {
            hidden ? // if hidden is true
            null : // don't render anything
            <CartDropdown /> // else render the CartDropdown component
        }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({ 
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
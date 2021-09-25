import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ? // if there are items in the cart
                ( // render them in cart item components
                    cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                ) :( // else render a message that the cart is empty
                    <span className='empty-message'>Your cart is empty</span>
                )
            }
        </div>
        <CustomButton
            onClick={() => history.push('/checkout')}
        >
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({ 
    cartItems: selectCartItems
});
        
export default withRouter(connect(mapStateToProps)(CartDropdown));